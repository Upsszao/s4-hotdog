Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
  end
end)




local obj = nil 
local cacheObj = nil
local cacheObjCoords = nil
Citizen.CreateThread(function()
   obj = CreateObject(-1581502570, vector3(389.59395629883, -356.50407104492, 46.997415161133),1,1,0)
   while true do
	   y = 2500
	   cacheObj = ESX.Game.GetClosestObject(GEC)
	   if GetEntityModel(cacheObj) == -1581502570 then 
	     
	        cacheObjCoords = GetEntityCoords(cacheObj)
		  
	      DrawText3D(cacheObjCoords.x, cacheObjCoords.y, cacheObjCoords.z+1, "[E] Sosisli yap")
		  y = 10
	   else 
	      cacheObj = nil
	   end
       Citizen.Wait(y)
   end
end)




function DrawText3D(x, y, z, text)
    local onScreen, _x, _y = World3dToScreen2d(x,y,z)
    if onScreen then
        local factor = #text / 370
        SetTextScale(0.30, 0.30)
        SetTextFont(4)
        SetTextProportional(1)
        SetTextColour(255, 255, 255, 215)
        SetTextEntry('STRING')
        SetTextCentre(1)
        AddTextComponentString(text)
        DrawText(_x, _y)
        DrawRect(_x, _y + 0.0120, 0.006 + factor, 0.024, 0, 0, 0, 155)
    end
end


AddEventHandler('onResourceStop', function(resourceName)
   if (GetCurrentResourceName() ~= resourceName) then
    return
   end
   if obj then 
      DeleteObject(obj)
   end
end)


 

RegisterKeyMapping('hotdog', 'hotdog', 'keyboard', 'e')
RegisterCommand('hotdog', function()
  if cacheObj then 
  ESX.TriggerServerCallback('s4:hotdog:server:malzemeKontrol', function(malzeme)
     if malzeme == true then 
	  SendNUIMessage({ action = "start" })
      SetNuiFocus(true, true)
	 end
  end)
  end
end)


RegisterNUICallback("Close", function(data)
  TriggerEvent('notification', data.reason, 2, 2000)
  if data.reason == "Başarılı" then 
     TSE("s4:hotdog:server:sosisver", data.icerik) 
  end
  SetNuiFocus(false, false)
end)

GEC = function(...) return vector4(GetEntityCoords(PlayerPedId()).x,GetEntityCoords(PlayerPedId()).y,GetEntityCoords(PlayerPedId()).z, GetEntityHeading(PlayerPedId())) end

TSE = function(...) TriggerServerEvent(...)  end