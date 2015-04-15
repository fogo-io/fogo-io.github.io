---
layout: post
title: Three Phase Motor Control using SVPWM
category : Embedded Design Tips
tagline: Embedded Design
tags : [motor, control, PWM, microcontroller, embedded]
---

Space Vector Pulse Width Modulation (SVPWM) is a method for controlling a three phase brushless motor.

## Theory of Operation

To understand SVMPWM, a basic knowledge of three phase systems is required.  Two mathematical transformations (Clarke
and Park) help to simplify the analysis of three phase systems.  These transformations facilitate converting
three voltages in to a rotating vector that represents the magnetic field applied to the motor.  Space vector modulation
uses digital pulses to convert the rotating magnetic field into duty cycles that are applied to the PWM outputs of a
microcontroller.

### Three phase windings plus Clarke and Park Representations

Three phase systems are analyzed using mathematical transformations that take advantage of the geometry of
the system.  The Clarke transformation uses the voltage applied to each phase and transforms them in to
a vector that represents the direction and magnitude of the magnetic field applied to the system.

#### Diagram of Clarke Transformation

The Park transformation is similar to the Clarke, but it rotates the resulting field.  This feature
is especially useful in motors because the transformation can handle a rotating field.

#### Diagram of the Park Transformation

### Field Control using PWM signals (6 sectors)

Once the desired vector is calculated, the vector is converted to PWM signals that are applied to the three phase
inverter circuit used to drive each motor winding.

#### Diagram of IGBT driving switches

The inverter circuit has three phases each having two states.

#### Diagram of sectors

## Application

Using SVPWM comes down to two inputs: the leading angle and the applied power.  These two factors can
be dynamically updated to control the speed and/or position of the motor.  For the system to work
properly, a feedback mechanism must provide an accurate location of the motor.  

The simplest feedback mechanism to use is an encoder.  Hall effect sensors require software algorithms 
to predict the motor position based on the speed.  Motors that use an encoder or hall effect sensors 
are known as "sensored" systems. "Sensorless" systems include measuring the current and voltage of each 
phase and extracting the position and speed using sophisticated algorithms.

### Calculating the Leading Angle

- Verify your PWM signals are correct by manually turning the encoder (or simulating encoder values) before attempting
to rotate the motor.

### Setting the Power

### Controlling the Speed

The power setting can be dynamically adjusted to set the speed using a PI control loop.

### Feedback Mechanism

- Ensure the field and the encoder (or other feedback mechanism) have the same polarity.  Otherwise,
the rotor will simply lock up.

## Conclusion


