# d&b audiotechnik amplifiers OCA Chataigne Module
Chataigne module to control d&amp;b audiotechnik amplifiers with OCA protocol.  

This community module is NOT OFFICIALLY supported by d&b audiotechnik.
It is publicly available to enable interested users to experiment, extend and create their own adaptations.
There is no guarantee for compatibility in between versions or for the implemented functionality to be reliable for professional.
Use what is provided here at your own risk!

That being said, I took great care to beta test all features with d&b hardware before commits.
Please use GitHub Issues and/or contact me on Discord if you see any bug, I'll try to fix it asap !

To learn more about Chataigne, please visit : http://benjamin.kuperberg.fr/chataigne/

And Ben's Youtube channel where you can find tutorials : https://youtu.be/RSBU9MwJNLY

To learn more about d&amp;b audiotechnik amps, please visit : https://www.dbaudio.com/global/en/products/all/product-types/amplifiers/  

To learn more about OCA protocol, please visit : https://ocaalliance.com/

For global support on how to use Chataigne and its modules, please join us on Discord : 
https://discord.com/invite/ngnJ5z my contact there is also "madees".

## Installation
To install the Custom Module, download the zip archive (on the top right green "Code" button of this window, drop down arrow, select "Local / download zip" option) and unzip it to you /Chataigne/Modules/ folder. Restart Chataigne or go to menu File>Reload custom Modules.

## Principle of use
You may use Module Commands to control basic amp features like Power, Mutes, amp presets recall.

## Module interface
First, global Module parameters :

#### - Model
Device model. Default is D80.

#### - Remote host
Target device IP. Default is 192.168.1.42.

## Commands
Commands are ready to use with the "Command tester" tool, Templates or as outputs from the State machine and Sequences in Time Machine, or even from scripts.

#### Amp preset recall
Integer parameter from 1 to 15.
Please note that 5D doesn't have amp preset, so this command is useless with this device model.

#### Power on
#### Power off

#### Mute A
#### Mute B
#### Mute C
#### Mute D

#### unMute A
#### unMute B
#### unMute C
#### unMute D
