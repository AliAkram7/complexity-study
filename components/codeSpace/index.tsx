'use client'
import { CodeHighlight } from '@mantine/code-highlight';
type Props = {
    code: string,
    lang: string,

}
export function CodeSpace({ code, lang }: Props) {
    return <CodeHighlight   mt="md" code={code} language={lang} />;
}