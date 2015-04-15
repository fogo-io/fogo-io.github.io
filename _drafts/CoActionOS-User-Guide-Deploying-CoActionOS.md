---
layout: post
title: Deploying CoActionOS
category: User Guides
tagline: CoActionOS User Guide
tags : [coaction, user-guide]
---

## From Development to Production

There are two approaches to deploying CoActionOS.

1.  As Is
2.  Stripped Down

### Deploy As Is

The first option is to deploy CoActionOS as is without stripping away any part of the OS.  This method has the following advantages.

- User Upgradeable Firmware (Applications and Kernel)
- User Installable Apps (3rd Parties can innovate on your product!)

The disadvantages:

- Larger ROM size
- Security (Users can install code on your device)

### Deploy a Stripped Down Version

If the cons for the As Is deployment option outweight the pros, you can also deploy a stripped down version of CoActionOS.  You can strip 
away any part of the OS that you don't need.

#### Exclude Unused Drivers

The easiest way to shrink the ROM size is to remove device drivers or filesystems that are not needed.  If you look at the files in the [board
support packages](https://github.com/CoActionOS/CoActionOS-HW), you will find a file called devices.c.  This file references the device drivers
and filesystems that will be available to applications.  You just need to comment out anything you are not using to exclude those items
from the binary.  For example, the following lines are commented out to exclude the I2C drivers.

{% highlight CPP %}
//DEVICE_PERIPH("i2c0", hwpl_i2c, 0, 0666, USER_ROOT, GROUP_ROOT, S_IFCHR),
//DEVICE_PERIPH("i2c1", hwpl_i2c, 1, 0666, USER_ROOT, GROUP_ROOT, S_IFCHR),
//DEVICE_PERIPH("i2c2", hwpl_i2c, 2, 0666, USER_ROOT, GROUP_ROOT, S_IFCHR),
{% endhighlight %}

If you aren't using the CoActionOS flash filesystem, that can also be excluded.

{% highlight CPP %}
const sysfs_t const sysfs_list[] = {
	//the folder for ram/flash applications
	SYSFS_APP("/app", &(devices[MEM_DEV]), SYSFS_ALL_ACCESS),
	SYSFS_DEV("/dev", devices, SYSFS_READONLY_ACCESS), //devices
	//CAFS_LITE("/home", &cafs_lite_cfg, SYSFS_ALL_ACCESS), //user files
	SYSFS_ROOT("/", sysfs_list, SYSFS_READONLY_ACCESS), //root
	SYSFS_TERMINATOR
};
{% endhighlight %}

#### Exclude Unused C/POSIX functions

To remove unsed portions of the standard C library or POSIX functions, you need to do a custom build of [CoActionOS](https://github.com/CoActionOS/CoActionOS-Public).  The file you want to modify is src/sys/symbols.c.  This file contains a list of all the functions that, if
not used by the kernel, are still included in the build so that they are available to applications.  It ensures that if an application links
to printf() (see src/crt/crt_symbols.S), then the printf() code will be part of the kernel.  However, if none of your deployed applications use printf(), you don't need it in the kernel.  To exclude a function, place a zero in the table (don't delete the line or simply comment it out!).

{% highlight CPP %}
uint32_t const symbols_table[] = {
	//...
	0, //(uint32_t)fprintf,
	0, //(uint32_t)printf,
	0, //(uint32_t)snprintf,
	(uint32_t)vfprintf,
	(uint32_t)sprintf,
	(uint32_t)vprintf,
	(uint32_t)vsnprintf,
	(uint32_t)vsprintf,
	//...

};
{% endhighlight %}

#### Unify Kernel and Application

If you still need to make the binary smaller, you can compile the application with the kernel.  In this case, you will want to exclude src/sys/symbols.c from the build entirely.  In the CoActionOS kernel library, the first thread is called intial_thread() and is weakly bound.  You can
add this function to your board support package to override the version in the kernel library.  The default initial thread function is shown below extracted from src/sys/intial_thread.c.  Instead of initializing the link functionality (link_init() and link_update()), you can call the main() function to your application and add the applicatoin source code directly to the board support package in Eclipse.

{% highlight CPP %}
void * initial_thread(void * arg){

	hwpl_core_privcall(priv_check_reset_source, NULL);

	//Initialize the file systems
	if ( init_fs() < 0 ){
		;
	}

	//Initialize the CoActionOS Link interface
	if ( link_init() < 0 ){
		hwpl_core_privcall(gled_priv_error, 0);
	}

	startup_fs();

	open("/dev/rtc", O_RDWR);

	usleep(100*1000);
	led_startup();
	link_update(NULL); 	//Run the link update thread--never returns

	return NULL;
}

{% endhighlight %}


#### Remove the Bootloader

On the CoAction-Hero, the bootloader is installed at address 0x0 while the kernel is installed at 0x40000 (at the 256K boundary of the 512K device).  If you don't need the bootloader, you can tell Eclipse to compile the kernel to execute at address 0x0 instead of 0x40000 (see Eclipse Project Properties->C/C++ Build->Build Variables->START_ADDR) and then use a JTAG or UART install tool to load the kernel.

## Take Away

The easiest way to shrink the size of CoActionOS is to exclude used drivers.  You can do this and still allow users to install custom apps and
upgrade the kernel.  You can further reduce the kernel size by limited the C/POSIX functions that are available to applications by modifying the symbol table in the CoActionOS kernel library.  Finally, you can disregard the kernel symbol table and just compile the application and kernel in a unified binary.



