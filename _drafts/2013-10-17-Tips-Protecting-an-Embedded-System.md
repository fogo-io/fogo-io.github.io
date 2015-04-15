---
layout: post
title: Protecting an Embedded System
category : Embedded Design Tips
tagline: Embedded Design
tags : [embedded, circuit, power]
---

Protecting external connections in an embedded design makes the system more robust.  Power supplies are particularly important to protect because an incorrect voltage applied to embedded system's power supply can damage the entire circuit.  Nonetheless, any unprotected IO can cause a failure.

The following circuit shows a power supply with over-current protection, reverse polarity protection, a surge protection diode, and a noise filter.

p=. !{width:60%}powerinput2.png!

FUSE1 prevents the circuit from drawing excess current with minimal impact to power efficiency.

Diode, D1, provides reverse polarity protection.  It protects the system in the event the user reverses the polarity on the power connector.  The forward voltage drop should be as low as possible for maximum efficiency. The efficiency is calculated by dividing the power consumed by the diode by that consumed by the circuit. The maximum power consumed by the diode is the maximum forward voltage times the current consumed by the entire circuit.  D1 should be selected on a design-by-design basis to properly balance efficiency with circuit protection.  Unlike reverse polarity protection, overvoltage protection is provided with minimal impact on power efficiency.

Diode, D2, provides over-voltage protection using a zener diode.  A zener diode allows current to flow in the reverse direction once the voltage exceeds the reverse breakdown voltage which should be slightly higher than the nominal power supply voltage but low enough to prevent damage to any device connected to V_{CC} (i.e. check the "Absolute Maximum Ratings" section of devices connected to V_{CC}).  If there is a surge on the power supply, D2 shunts current to V_{IN}- in order to prevent V_{CC} from exceeding the reverse breakdown voltage of D2.  In addition to protecting power supplies, any signals that have an external connection can also benefit from protection circuitry.

h1. IO Protection with a Current Limiting Resistor

p=. !{width:70%}uartoutput.png!

A current limiting resistor can protect an IO signal with an external connection in the event an incorrect voltage is applied.  The image above shows a UART jack that is used to allow third party access.  Larger values for the current limiting resistor provide better protection but, if too large, may cause improper operation.  If no pulling resistors are used on the TX and RX lines, R1 and R2 can be in the kilo-ohm range to limit the amount of current that may flow in to RX or TX if an erroneous voltage is applied.  If VCC and GND are used only as reference voltages (rather than providing power to J1), R3 and R4 can also be in the kilo-ohm range in order to protect the PCB's power supply from J1.  Higher resistor values provide better protection.  If the resistor value is too high, the signal may not function properly especially in the presence of pulling resistors as illustrated in the image below.

p=. !{width:70%}uartpullup2.png!

The value of _R_ _~PULLUP~_ needs to be significantly higher than R2.  The voltage at RX can be calculated using the following equation (derivation shown):

p=. !{width:60%}Formula.png!

When the J1-2 drives the RX line high _(V_ _~J1-2~_ _=V_ _~CC~_ _)), the voltage at RX is equal to _V_ _~CC~_ regardless of the values of the resistors.  However when J1-2 drives the RX line low, _R_ _~PULLUP~_ must be significantly larger than _R_ _~2~_ to ensure the voltage at RX is lower than the specified input low voltage.  For example, if 

p=. !{width:40%}Formula1.png! 

preventing the UART from working correctly.



