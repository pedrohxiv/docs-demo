import { Editor } from "./_components/editor";
import { Toolbar } from "./_components/toolbar";

interface Props {
  params: Promise<{ documentId: string }>;
}

const DocumentPage = async ({ params }: Props) => {
  const { documentId } = await params;

  return (
    <div className="min-h-screen bg-[#fafbfd]">
      <Toolbar />
      <Editor />
    </div>
  );
};

export default DocumentPage;
