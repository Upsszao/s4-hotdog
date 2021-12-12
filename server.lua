ESX = nil

TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

RegisterNetEvent("s4:hotdog:server:sosisver")
AddEventHandler("s4:hotdog:server:sosisver", function(malzeme) 
  local src = source
  local xPlayer = ESX.GetPlayerFromId(src)
  local EsxItems = ESX.GetItems()
  xPlayer.addInventoryItem("sosisli", 1)
  TriggerClientEvent('inventory:client:ItemBox', src, EsxItems[malzeme], "add", 1)
end)

ESX.RegisterServerCallback('s4:hotdog:server:malzemeKontrol', function(source, cb)
    local xPlayer = ESX.GetPlayerFromId(source)
	local durum = true
    local malzemeler = {  
  { label = 'Domates', value = 'domates'},
	{ label = 'Salam', value = 'salam'},
	{ label = 'Ekmek', value = 'ekmek'},
	{ label = 'Marul', value = 'marul'},
	 
	}
	
	for k, v in ipairs(malzemeler) do
	  if xPlayer.getQuantity(v.value) >= 1 then 
	    
	  else
	    TriggerClientEvent('mythic_notify:client:SendAlert', source, { type = 'error', text = v.label.." Malzemesi eksik."  })
		durum = false
		break;
	  end
	end
	
	cb(durum)
	
	if durum == true then 
	   for k, v in ipairs(malzemeler) do
	      xPlayer.removeInventoryItem(v.value, 1)
	   end
	end
 
end)