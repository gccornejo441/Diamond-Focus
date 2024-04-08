import { useEffect } from "react";

const useDocumentHead = (title: string, faviconUrl?: string) => {
    useEffect(() => {
        if (title) {
            document.title = title
        }

        if (faviconUrl) {
            const link = document.createElement("link");
            link.rel = "icon";
            link.href = faviconUrl;
            document.head.appendChild(link);
            const head = document.getElementsByTagName('head')[0];
            const existingIcons = document.querySelectorAll("link[rel*='icon']");
            existingIcons.forEach(icon => head.removeChild(icon));

            head.appendChild(link);
        }
    }, [title, faviconUrl]);
}

export default useDocumentHead;