"use client";

export default function DeleteSettingDialog({
  open,
  setting,
  onClose,
  onConfirm,
}: any) {

  if (!open) return null;

  return (

<div className="fixed inset-0 bg-black/70 flex items-center justify-center">

<div className="bg-slate-900 rounded-xl p-8 w-[420px]">

<h2 className="text-2xl font-bold">
Delete Setting
</h2>

<p className="mt-4 text-gray-400">

Delete

<strong>

 {setting?.SettingKey}

</strong>

 ?

</p>

<div className="flex justify-end gap-4 mt-8">

<button
onClick={onClose}
className="px-4 py-2 bg-slate-700 rounded"
>
Cancel
</button>

<button
onClick={onConfirm}
className="px-4 py-2 bg-red-600 rounded"
>
Delete
</button>

</div>

</div>

</div>

  );
}