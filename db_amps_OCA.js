/* Chataigne Module for d&b audiotechnik amps control via OCA v1.1 (c) Mathieu Delquignies, 06/2024-10/2025
===============================================================================
This file is a Chataigne Custom Module to remote control d&b audiotechnik amplifiers.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
1. Redistributions of source code must retain the above copyright notice,
this list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice,
this list of conditions and the following disclaimer in the documentation
and/or other materials provided with the distribution.
3. The name of the author may not be used to endorse or promote products
derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED "AS IS" AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT,
INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
===============================================================================
*/

/** 
 * Constants
 * 
 * Table of OSC strings from https://www.dbaudio.com/assets/products/downloads/manuals-documentation/electronics/dbaudio-osc-protocol-ds100-1.3.7-en.PDF
 * Juce Javascript don't allow const so they are defined as global variable instead, see https://docs.juce.com/master/index.html
 */

var currentModel = "none";
var updateRate =2; // check for errors twice a second (parameter is update rate 2 Hz) WIP
// Constants bytes array for OCA commands
var msg_noError =[];
var msg_error =[];
var msg_5DpowerOn =[];
var msg_powerOn =[];
var msg_5DpowerOff =[];
var msg_powerOff =[];
var msg_muteA =[];
var msg_unMuteA =[];
var msg_muteB =[];
var msg_unMuteB =[];
var msg_muteC =[];
var msg_unMuteC =[];
var msg_muteD =[];
var msg_unMuteD =[];
var msg_5DgetError =[];
var msg_getError =[];
var msg_ampPreset =[];

function init()
{
	// Convert OCA commands to Bytes arrays
	msg_5DpowerOn =  hexToBytes("3b00010000001c01000100000013000006fb1000010100040002010001");
	msg_powerOn =    hexToBytes("3b00010000001c01000100000013000006fb1000010000040002010001");

	msg_5DpowerOff = hexToBytes("3b00010000001c01000100000013000006fb1000010100040002010000");
	msg_powerOff =   hexToBytes("3b00010000001c01000100000013000006fb1000010000040002010000");

	msg_muteA =      hexToBytes("3b00010000001b01000100000012000006c410008205000400020101");
	msg_unMuteA =    hexToBytes("3b00010000001b01000100000012000006c810008205000400020102");

	msg_muteB =      hexToBytes("3b00010000001b01000100000012000006c510010205000400020101");
	msg_unMuteB =    hexToBytes("3b00010000001b01000100000012000006c910010205000400020102");

	msg_muteC =      hexToBytes("3b00010000001b01000100000012000006c610018205000400020101");
	msg_unMuteC =    hexToBytes("3b00010000001b01000100000012000006ca10018205000400020102");

	msg_muteD =      hexToBytes("3b00010000001b01000100000012000006c710020205000400020101");
	msg_unMuteD =    hexToBytes("3b00010000001b01000100000012000006cb10020205000400020102");

	msg_noError =    hexToBytes("3b0001000000140300010000000b00000015000100");
	msg_error =      hexToBytes("3b0001000000140300010000000b00000015000101");
	msg_5DgetError = hexToBytes("3b00010000001a0100010000001100000015100005010005000100");
	msg_getError =   hexToBytes("3b00010000001a0100010000001100000015100005000005000100");

	msg_ampPreset =  hexToBytes("3b00010000001b0100010000001200000130000027130003000301");
	
	script.setUpdateRate(updateRate);
	local.scripts.setCollapsed(true);

	// Initial setup com
	currentModel=local.parameters.model.get();
	if (currentModel=="5D" || currentModel=="40D" || currentModel=="D40")
				{
					local.parameters.output.remotePort.set(50014);
				}
			else
				{
					local.parameters.output.remotePort.set(30013);
				}
}

function moduleParameterChanged(param)
{
	if(param.isParameter())
	{
		if(param.name == "model")
		{
			currentModel=param.get();
			if (currentModel=="5D" || currentModel=="40D" || currentModel=="D40")
				{
					local.parameters.output.remotePort.set(50014);
				}
			else
				{
					local.parameters.output.remotePort.set(30013);
				}
		}
	}
}

function update(deltaTime)
{
	//getErrorStatus(); // WIP
}

function dataReceived(data) 
{
	// no input from now, WIP
	script.log("Received data : "+data);
	if(data==msg_noError)
		{
			// no error
			local.values.error.set(false);
		}
	if(data==msg_error)
		{
			// error
			local.values.error.set(true);
		}
}

/**
 * Callback functions for commands
 */

function powerOn()
{
	script.log("Power ON");
	if (currentModel=="5D")
	{
		local.sendBytes(msg_5DpowerOn);
	}
	else
	{
		local.sendBytes(msg_powerOn);
	}
}
function powerOff()
{
	script.log("Power off");
	if (currentModel=="5D")
	{
		local.sendBytes(msg_5DpowerOff);
	}
	else
	{
		local.sendBytes(msg_powerOff);
	}
}

function muteA()
{
	local.sendBytes(msg_muteA);
}
function unMuteA()
{
	local.sendBytes(msg_unMuteA);
}

function muteB()
{
	local.sendBytes(msg_muteB);
}
function unMuteB()
{
	local.sendBytes(msg_unMuteB);
}

function muteC()
{
	local.sendBytes(msg_muteC);
}
function unMuteC()
{
	local.sendBytes(msg_unMuteC);
}

function muteD()
{
	local.sendBytes(msg_muteD);
}
function unMuteD()
{
	local.sendBytes(msg_unMuteD);
}

// WIP
function getErrorStatus()
{
	if (currentModel=="5D")
	{
		local.sendBytes(msg_5DgetError);
	}
	else
	{
		local.sendBytes(msg_getError);
	}
}

function ampPresetRecall(number)
{
	if (currentModel=="5D")
	{
		script.log("! Le 5D n'a pas de Amp Presets !");
	}
	else
	{
		local.sendBytes(msg_ampPreset, number);
	}
}

// Convert a hex string to a byte array
function hexToBytes(hexStr) 
{
	var hexStrLength = hexStr.length;
	var bytes = [];

	for (var c = 0; c < hexStrLength; c += 2)
	{ 
		bytes.push(parseInt("0x"+hexStr.substring(c, c+2), 16));
	}
	return bytes;
}