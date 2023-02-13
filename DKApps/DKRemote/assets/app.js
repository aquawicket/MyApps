// NOTICE:  migrating filename to "main.js"

/*
* This source file is part of digitalknob, the cross-platform C/C++/Javascript/Html/Css Solution
*
* For the latest information, see https://github.com/aquawicket/DigitalKnob
*
* Copyright(c) 2010 - 2023 Digitalknob Team, and contributors
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files(the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and /or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions :
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

// executable app startup script
var USE_CEF     = 0; //Use Cef browser
var USE_RML     = 1; //Use Rml browser
var USE_SDL     = 0; //Use SDL window
var USE_WEBVIEW = 0; //TODO: Android, iOS

var DKApp_url = "file:///"+DKAssets_LocalAssets()+"index.html";
//var DKApp_url = "http://google.com";
//var DKApp_url = "file:///"+DKAssets_LocalAssets()+"index.html?plugin=DKNotepad/DKNotepad";

dk.create("DK/init.js", function(){}); //load DKApp_url using flags above, then call app_LoadPlugins()

function app_LoadPlugins() {
	if(USE_SDL)
		dk.create("DKSDLText"); //Class contains SDL fps counter
	dk.create("DKTray/DKTray.js", function(){});
	dk.create("DKDebug/DKDebug.js", function(){});
}