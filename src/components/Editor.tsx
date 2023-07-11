import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { BubbleMenu, EditorContent, FloatingMenu, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import js from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/tokyo-night-dark.css'
import { lowlight } from 'lowlight'
import {
    RxChatBubble,
    RxChevronDown,
    RxCode,
    RxFontBold,
    RxFontItalic,
    RxStrikethrough,
} from 'react-icons/rx'

import { BubbleButton } from './BubbleButton'

import { initialContent } from './initialContent'

lowlight.registerLanguage('js', js)

export function Editor() {
    const editor = useEditor({
        extensions: [
            StarterKit,
            CodeBlockLowlight.configure({
                lowlight,
            }),
        ],
        onUpdate: (editor) => {
            console.log(editor.editor.getHTML())
            console.log(editor.editor.getJSON())
            console.log(editor.editor.getText())
        },
        content: initialContent,
        editorProps: {
            attributes: {
                class: 'outline-none',
            },
        },
    })

    return (
        <>
            <EditorContent
                className='max-w-[700px] mx-auto pt-16 prose prose-invert prose-violet'
                editor={editor}
            />

            {
                editor && (
                    <FloatingMenu
                        className='bg-zinc-700 py-2 px-1 shadow-xl border border-zinc-600 shadow-black/20 rounded-lg overflow-hidden flex flex-col gap-1'
                        editor={editor}
                        shouldShow={({ state }) => {
                            const { $from } = state.selection

                            const currentLineText = $from.nodeBefore?.textContent

                            return currentLineText === '/'
                        }}
                    >
                        <button
                            className='flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600'
                            onClick={() => editor.chain().focus().setParagraph().run()}
                        >
                            <img
                                src='https://www.notion.so/images/blocks/text/en-US.png'
                                alt='Text'
                                className='w-12 border border-zinc-600 rounded'
                            />

                            <div className='flex flex-col text-left'>
                                <span className='text-sm'>
                                    Text
                                </span>

                                <span className='text-xs text-zinc-400'>
                                    Comece a escrever com texto sem formatação.
                                </span>
                            </div>
                        </button>

                        <button
                            className='flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600'
                            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        >
                            <img
                                src='https://www.notion.so/images/blocks/header.57a7576a.png'
                                alt='Heading'
                                className='w-12 border border-zinc-600 rounded'
                            />

                            <div className='flex flex-col text-left'>
                                <span className='text-sm'>
                                    Heading 1
                                </span>

                                <span className='text-xs text-zinc-400'>
                                    Título de seção grande.
                                </span>
                            </div>
                        </button>

                        <button
                            className='flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600'
                            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        >
                            <img
                                src='https://www.notion.so/images/blocks/subheader.9aab4769.png'
                                alt='Heading'
                                className='w-12 border border-zinc-600 rounded'
                            />

                            <div className='flex flex-col text-left'>
                                <span className='text-sm'>
                                    Heading 2
                                </span>

                                <span className='text-xs text-zinc-400'>
                                    Título de seção médio.
                                </span>
                            </div>
                        </button>

                        <button
                            className='flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600'
                            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        >
                            <img
                                src='https://www.notion.so/images/blocks/subsubheader.d0ed0bb3.png'
                                alt='Heading'
                                className='w-12 border border-zinc-600 rounded'
                            />

                            <div className='flex flex-col text-left'>
                                <span className='text-sm'>
                                    Heading 3
                                </span>

                                <span className='text-xs text-zinc-400'>
                                    Título de seção pequeno.
                                </span>
                            </div>
                        </button>
                    </FloatingMenu>
                )
            }

            {
                editor && (
                    <BubbleMenu
                        className='bg-zinc-700 shadow-xl border border-zinc-600 shadow-black/20 rounded-lg overflow-hidden flex divide-x divide-x-zinc-600'
                        editor={editor}
                    >
                        <BubbleButton
                            onClick={() => editor.chain().focus().setParagraph().run()}
                            data-active={editor.isActive('paragraph')}
                        >
                            Text

                            <RxChevronDown className='w-3 h-3' />
                        </BubbleButton>

                        <BubbleButton>
                            <RxChatBubble className='w-3 h-3' />

                            Comment
                        </BubbleButton>

                        <div className='flex items-center'>
                            <BubbleButton
                                onClick={() => editor.chain().focus().toggleBold().run()}
                                data-active={editor.isActive('bold')}
                            >
                                <RxFontBold className='w-3 h-3' />
                            </BubbleButton>

                            <BubbleButton
                                onClick={() => editor.chain().focus().toggleItalic().run()}
                                data-active={editor.isActive('italic')}
                            >
                                <RxFontItalic className='w-3 h-3' />
                            </BubbleButton>

                            <BubbleButton
                                onClick={() => editor.chain().focus().toggleStrike().run()}
                                data-active={editor.isActive('strike')}
                            >
                                <RxStrikethrough className='w-3 h-3' />
                            </BubbleButton>

                            <BubbleButton
                                onClick={() => editor.chain().focus().toggleCode().run()}
                                data-active={editor.isActive('code')}
                            >
                                <RxCode className='w-3 h-3' />
                            </BubbleButton>
                        </div>
                    </BubbleMenu>
                )
            }
        </>
    )
}
