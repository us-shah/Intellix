"use client";
import {useEffect,useMemo,useState}from"react";
import{useParams}from"next/navigation";
import{CheckCircle2,Circle,ExternalLink,PlayCircle}from"lucide-react";
import LmsShell from"@/components/lms/LmsShell";
import{Card,Empty,ErrorBox,PageTitle,btn}from"@/components/lms/Ui";
import{lmsApi}from"@/lib/lms";
import type{Course,Lesson}from"@/types/lms";

export default function Page(){
 const id=Number(useParams().id);const[c,setC]=useState<Course|null>(null);const[lessons,setLessons]=useState<Lesson[]>([]);const[completed,setCompleted]=useState<number[]>([]);const[progress,setProgress]=useState(0);const[error,setError]=useState("");
 useEffect(()=>{Promise.all([lmsApi.course(id),lmsApi.lessons(id),lmsApi.courseProgress(id)]).then(([a,b,p])=>{setC(a);setLessons(b);setCompleted(p.completed_lesson_ids);setProgress(p.progress)}).catch((e)=>setError(e.response?.data?.detail||"Unable to open course"))},[id]);
 const done=useMemo(()=>new Set(completed),[completed]);
 async function complete(lessonId:number){try{const r=await lmsApi.completeLesson(lessonId);setCompleted(x=>x.includes(lessonId)?x:[...x,lessonId]);setProgress(r.progress)}catch(e:any){setError(e.response?.data?.detail||"Unable to update progress")}}
 return <LmsShell mode="student"><PageTitle title={c?.Title||"Course"} description={c?.ShortDescription||"Course lessons"}/>{error&&<ErrorBox text={error}/>}<Card className="mb-6"><div className="flex items-center justify-between gap-4"><div><p className="text-sm font-semibold text-slate-700">Course progress</p><p className="mt-1 text-2xl font-black text-slate-950">{Math.round(progress)}%</p></div><div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-blue-600 transition-all" style={{width:`${progress}%`}}/></div></div></Card><div className="space-y-4">{lessons.map((x,i)=><Card key={x.LessonID}><div className="flex items-start gap-4"><div className={`mt-1 ${done.has(x.LessonID)?"text-green-600":"text-slate-400"}`}>{done.has(x.LessonID)?<CheckCircle2/>:<Circle/>}</div><div className="min-w-0 flex-1"><p className="text-xs font-bold uppercase tracking-wide text-blue-700">Lesson {i+1}</p><h2 className="mt-1 text-lg font-bold text-slate-950">{x.Title}</h2>{x.Content&&<p className="mt-3 whitespace-pre-wrap text-slate-700">{x.Content}</p>}{x.VideoURL&&<div className="mt-4"><a href={x.VideoURL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-semibold text-blue-700"><PlayCircle size={18}/>Open video lesson <ExternalLink size={14}/></a></div>}{x.ResourceURL&&<div className="mt-2"><a href={x.ResourceURL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700">Open lesson resource <ExternalLink size={14}/></a></div>}<button disabled={done.has(x.LessonID)} className={`${btn} mt-5`} onClick={()=>void complete(x.LessonID)}>{done.has(x.LessonID)?"Completed":"Mark lesson complete"}</button></div></div></Card>)}{!lessons.length&&<Empty text="No lessons have been published."/>}</div></LmsShell>
}
