#pragma once
#ifndef DKTorrent_H
#define DKTorrent_H
#include "DK.h"


/////////////////////////////////////////////
class DKTorrent : public DKObjectT<DKTorrent>
{
public:
	void Init();
	void End();

};


REGISTER_OBJECT(DKTorrent, true);

#endif //DKTorrent_H

