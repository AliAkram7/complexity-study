'use client'
import { CodeHighlightTabs } from '@mantine/code-highlight';
type Props = {
    code: string,
    lang?: string,

}
export function CodeSpace({ code, lang }: Props) {
    return <CodeHighlightTabs mt="md"
        code={[
            { fileName: `Demo.${lang}`, code: code, language: lang || "tsx" },
        ]}
    />;
}