"use client";
import { useEffect, useState } from "react";
import { getSettings, createSetting as apiCreate, updateSetting as apiUpdate, deleteSetting as apiDelete } from "@/lib/settings";
export function useSettings(){
 const [settings,setSettings]=useState<any[]>([]);const[loading,setLoading]=useState(true);
 const fetchSettings=async()=>{try{setLoading(true);setSettings(await getSettings())}finally{setLoading(false)}};
 useEffect(()=>{void fetchSettings()},[]);
 const createSetting=async(data:any)=>{await apiCreate(data);await fetchSettings()};
 const updateSetting=async(id:number,data:any)=>{await apiUpdate(id,data);await fetchSettings()};
 const deleteSetting=async(id:number)=>{await apiDelete(id);await fetchSettings()};
 return{settings,loading,fetchSettings,createSetting,updateSetting,deleteSetting,removeSetting:deleteSetting};
}
export default useSettings;
