import dynamic from "next/dynamic";


export function useMarkdown() {
  const SimpleMdeEditor = dynamic(
    () => import("react-simplemde-editor"),
    { ssr: false }
  );
  const markdown = (
    <SimpleMdeEditor/>
  )
  return {
    markdown
  }
}