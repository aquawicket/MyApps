#include "stdafx.h"
#include "DKVncServer.h"

#include <rfb/rfb.h>

///////////////////
void DKVncServer::Init()
{
    rfbScreenInfoPtr server=rfbGetScreen(&DKApp::argc, DKApp::argv, 400, 300, 8, 3, 4);
    server->frameBuffer=(char*)malloc(400*300*4);
    rfbInitServer(server);
    rfbRunEventLoop(server,-1,FALSE);
}

//////////////////
void DKVncServer::End()
{

}
