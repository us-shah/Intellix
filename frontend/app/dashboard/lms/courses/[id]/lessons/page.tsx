"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import LmsShell from "@/components/lms/LmsShell";
import { Card, Empty, ErrorBox, PageTitle, btn, input, secondary } from "@/components/lms/Ui";
import { lmsApi } from "@/lib/lms";
import type { Course, Lesson } from "@/types/lms";

const blank = {Title:"",Content:"",VideoURL:"",ResourceURL:"",SortOrder:0,IsPreview:false};

export default function LessonsPage(){
  const id=Number(useParams().id);
  const [course,setCourse]=useState<Course|null>(null);
  const [items,setItems]=useState<Lesson[]>([]);
  const [form,setForm]=useState(blank);
  const [editing,setEditing]=useState<number|null>(null);
  const [error,setError]=useState("");
  const load=()=>Promise.all([lmsApi.course(id),lmsApi.lessons(id)]).then(([c,l])=>{setCourse(c);setItems(l)});
  useEffect(()=>{void load().catch(()=>setError("Unable to load course lessons"))},[id]);
  async function save(e:React.FormEvent){e.preventDefault();setError("");try{if(editing)await lmsApi.updateLesson(editing,form);else await lmsApi.addLesson(id,form);setForm(blank);setEditing(null);await load()}catch(e:any){setError(e.response?.data?.detail||"Unable to save lesson")}}
  function edit(x:Lesson){setEditing(x.LessonID);setForm({Title:x.Title,Content:x.Content||"",VideoURL:x.VideoURL||"",ResourceURL:x.ResourceURL||"",SortOrder:x.SortOrder||0,IsPreview:!!x.IsPreview})}
  async function remove(x:Lesson){if(!confirm(`Delete lesson "${x.Title}"?`))return;await lmsApi.deleteLesson(x.LessonID);await load()}
  return <LmsShell mode="admin"><PageTitle title={`${course?.Title||"Course"} · Lessons`} description="Add lesson content, video URLs and downloadable resources."/>{error&&<ErrorBox text={error}/>}<Card className="mb-6"><form onSubmit={save} className="grid gap-4 md:grid-cols-2"><label>Lesson title<input className={input} value={form.Title} onChange={e=>setForm({...form,Title:e.target.value})} required/></label><label>Sort order<input className={input} type="number" value={form.SortOrder} onChange={e=>setForm({...form,SortOrder:Number(e.target.value)})}/></label><label className="md:col-span-2">Lesson content<textarea className={input} rows={7} value={form.Content} onChange={e=>setForm({...form,Content:e.target.value})} placeholder="Write lesson notes, explanation or instructions..."/></label><label>Video URL<input className={input} value={form.VideoURL} onChange={e=>setForm({...form,VideoURL:e.target.value})} placeholder="https://youtube.com/embed/..."/></label><label>Resource URL<input className={input} value={form.ResourceURL} onChange={e=>setForm({...form,ResourceURL:e.target.value})} placeholder="PDF, Drive or downloadable resource"/></label><label className="flex items-center gap-2"><input type="checkbox" checked={form.IsPreview} onChange={e=>setForm({...form,IsPreview:e.target.checked})}/> Allow preview</label><div className="md:col-span-2 flex gap-2"><button className={btn}>{editing?"Update lesson":"Add lesson"}</button>{editing&&<button type="button" className={secondary} onClick={()=>{setEditing(null);setForm(blank)}}>Cancel</button>}</div></form></Card><div className="space-y-3">{items.map((x,i)=><Card key={x.LessonID}><div className="flex flex-col justify-between gap-3 sm:flex-row"><div><p className="text-xs font-bold uppercase tracking-wide text-blue-700">Lesson {i+1}</p><h2 className="mt-1 font-bold text-slate-950">{x.Title}</h2><p className="mt-2 line-clamp-2 text-sm text-slate-600">{x.Content||"No written content"}</p></div><div className="flex gap-2"><button className={secondary} onClick={()=>edit(x)}>Edit</button><button className="rounded-lg bg-red-50 px-4 py-2 font-medium text-red-700 hover:bg-red-100" onClick={()=>void remove(x)}>Delete</button></div></div></Card>)}{!items.length&&<Empty text="No lessons yet. Add the first lesson above."/>}</div></LmsShell>
}
