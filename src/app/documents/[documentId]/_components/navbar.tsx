"use client";

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import {
  BoldIcon,
  DownloadIcon,
  FilePenIcon,
  FilePlusIcon,
  FilesIcon,
  ItalicIcon,
  MessageSquareTextIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TableIcon,
  TrashIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useEditorStore } from "@/store/use-editor-store";

import { Avatars } from "./avatars";
import { DocumentInput } from "./document-input";

export const Navbar = () => {
  const { editor } = useEditorStore();

  const insertTable = ({ cols, rows }: { rows: number; cols: number }) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ cols, rows, withHeaderRow: false })
      .run();
  };

  const onDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = filename;

    a.click();
  };

  const handleDownloadJSON = () => {
    if (!editor) {
      return;
    }

    const content = editor.getJSON();

    const blob = new Blob([JSON.stringify(content)], {
      type: "application/json",
    });

    onDownload(blob, `document.json`);
  };

  const handleDownloadHTML = () => {
    if (!editor) {
      return;
    }

    const content = editor.getHTML();

    const blob = new Blob([content], {
      type: "text/html",
    });

    onDownload(blob, `document.html`);
  };

  const handleDownloadText = () => {
    if (!editor) {
      return;
    }

    const content = editor.getText();

    const blob = new Blob([content], {
      type: "text/plain",
    });

    onDownload(blob, `document.txt`);
  };

  return (
    <nav className="flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" height={26} width={26} />
        </Link>
        <div className="flex flex-col">
          <DocumentInput />
          <div className="flex -mt-1 ml-0.5">
            <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
              <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarItem>
                    <FilePlusIcon className="size-4 mr-2" />
                    New Document
                  </MenubarItem>
                  <MenubarItem>
                    <FilesIcon className="size-4 mr-2" />
                    Make a copy
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <DownloadIcon className="size-4 mr-2" />
                      Download
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={handleDownloadJSON}>
                        JSON File (.json)
                      </MenubarItem>
                      <MenubarItem onClick={handleDownloadHTML}>
                        Web Page (.html)
                      </MenubarItem>
                      <MenubarItem onClick={() => window.print()}>
                        PDF Document (.pdf)
                      </MenubarItem>
                      <MenubarItem onClick={handleDownloadText}>
                        Plain Text (.txt)
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSeparator />
                  <MenubarItem>
                    <FilePenIcon className="size-4 mr-2" />
                    Rename
                  </MenubarItem>
                  <MenubarItem>
                    <TrashIcon className="size-4 mr-2" />
                    Remove
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => window.print()}>
                    <PrinterIcon className="size-4 mr-2" />
                    Print<MenubarShortcut>Ctrl+P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Edit</MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarItem
                    onClick={() => editor?.chain().focus().undo().run()}
                  >
                    <Undo2Icon className="size-4 mr-2" />
                    Undo<MenubarShortcut>Ctrl+Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().redo().run()}
                  >
                    <Redo2Icon className="size-4 mr-2" />
                    Redo<MenubarShortcut>Ctrl+Y</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>View</MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarItem>
                    <MessageSquareTextIcon className="size-4 mr-2" />
                    Comments
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Insert</MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TableIcon className="size-4 mr-2" />
                      Table
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        onClick={() => insertTable({ cols: 1, rows: 1 })}
                      >
                        1 x 1
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => insertTable({ cols: 2, rows: 2 })}
                      >
                        2 x 2
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => insertTable({ cols: 3, rows: 3 })}
                      >
                        3 x 3
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => insertTable({ cols: 4, rows: 4 })}
                      >
                        4 x 4
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Format</MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <BoldIcon className="size-4 mr-2" />
                      Text
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleBold().run()
                        }
                      >
                        <BoldIcon className="size-4 mr-2" />
                        Bold<MenubarShortcut>Ctrl+B</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleItalic().run()
                        }
                      >
                        <ItalicIcon className="size-4 mr-2" />
                        Italic<MenubarShortcut>Ctrl+I</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleUnderline().run()
                        }
                      >
                        <UnderlineIcon className="size-4 mr-2" />
                        Underline<MenubarShortcut>Ctrl+U</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleStrike().run()
                        }
                      >
                        <StrikethroughIcon className="size-4 mr-2" />
                        Strikethrough&nbsp;&nbsp;
                        <MenubarShortcut>Ctrl+Shift+S</MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSeparator />
                  <MenubarItem
                    onClick={() =>
                      editor?.chain().focus().unsetAllMarks().run()
                    }
                  >
                    <RemoveFormattingIcon className="size-4 mr-2" />
                    Clear formatting
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Tools</MenubarTrigger>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Extensions</MenubarTrigger>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Help</MenubarTrigger>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-center pl-6">
        <Avatars />
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/"
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl="/"
          afterSelectPersonalUrl="/"
        />
        <UserButton />
      </div>
    </nav>
  );
};
