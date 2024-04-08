import { useEffect } from "react";

const useDocumentHead = (title: string, faviconUrl: string) => {
    useEffect(() => {
        document.title = title;

        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = faviconUrl;
        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, [title, faviconUrl]);
}

export default useDocumentHead;