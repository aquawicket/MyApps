#pragma once
#ifndef DKVncServer_H
#define DKVncServer_H
#include "DK.h"


///////////////////////////////////////
class DKVncServer : public DKObjectT<DKVncServer>
{
public:
	void Init();
	void End();

};


REGISTER_OBJECT(DKVncServer, true);

#endif //DKVncServer_H

