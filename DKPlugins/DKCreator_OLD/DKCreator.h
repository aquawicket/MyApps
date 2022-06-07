/*
* This source file is part of digitalknob, the cross-platform C/C++/Javascript/Html/Css Solution
*
* For the latest information, see https://github.com/aquawicket/DigitalKnob
*
* Copyright(c) 2010 - 2022 Digitalknob Team, and contributors
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files(the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and /or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions :
*
* The above copyright noticeand this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

#pragma once
#ifndef DKCreator_H
#define DKCreator_H
#include "DK.h"
#include "DKEvent.h"

/////////////////////////////////////////////
class DKCreator : public DKObjectT<DKCreator>
{
public:
	//Functions registered to function table
	void* GetAppList(DKString);
	void* GetLibList(DKString);
	void* GetAppPath(DKString value);

	void Init();
	DKString GetGrid(const DKString& lib);
	void SvnUpdate();
	void SvnCommit();
	bool BuildLib(const DKString& lib, const DKString& os, const DKString& type);
	bool BuildLibs(const DKString& os, const DKString& type);
	bool RunApp(const DKString& app, const DKString& os, const DKString& type);
	bool CopyAssets(const DKString& app, const DKString& os, const DKString& type);
	bool CreateAssetsHeader(const DKString& app, const DKString& os);
	bool RebuildApp(const DKString& app, const DKString& os, const DKString& type);
	bool BuildApp(const DKString& app, const DKString& os, const DKString& type);
	bool BuildEVERYTHING();
	bool GetAppPath(const DKString& app, DKString& path);

private:
	void OnEvent(DKEvent* event);
	void NewApp(const DKString& app);
	void GenerateTemplate(DKString& file);
	bool OSCheck(const DKString& os);
	bool VerifyTools(const DKString& os);
	bool VerifyTool(const DKString& os, const DKString& file);
	bool VerifyLibraries(const DKString& os);
	bool VerifyLibrary(const DKString& os,const DKString& file);
	bool InstallTool(const DKString& os, const DKString& file);
	bool InstallLibrary(const DKString& os, const DKString& file);
	bool ReplaceVariables(const DKString& os, DKString& string);
	bool CopyFiles(const DKStringArray& filelist);
	void AddToGrid(const DKString& str1, const DKString& str2);
	bool UpdateAndroidAppName(const DKString& app);
	bool BundleLibs(const DKString& os);
	bool GetDKAssets(const DKString& app, const DKString& os, bool overwrite);
	bool MakeApp(const DKString& app, const DKString& os, const DKString& type);
	bool MakeLib(const DKString& libname, const DKString& os, const DKString& type);
	bool PatchLibrary(const DKString& libpath);
	bool RunScriptNode(const DKString& file, const DKString& nodename, const DKString& os);

	//TODO: change this to an std::map (string, string)
	//Also: what about a full grid. more than 2 
	DKStringGrid datagrid;	
};

REGISTER_OBJECT(DKCreator, true);

#endif //DKCreator_H