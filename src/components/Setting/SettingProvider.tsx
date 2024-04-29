const SettingProvider = () => {

    return (
        <div className="absolute inset-0">
            <div
                className="fixed inset-0 bg-black/50 dark:bg-black/80"
                data-state="open"
                style={{
                    pointerEvents: 'auto'
                }}
            >
                <div
                    className="grid h-full w-full grid-cols-[10px_1fr_10px] overflow-y-auto grid-rows-[minmax(10px,_1fr)_auto_minmax(10px,_1fr)] md:grid-rows-[minmax(20px,_1fr)_auto_minmax(20px,_1fr)]"
                    style={{
                        opacity: '1',
                        transform: 'none'
                    }}
                >
                    <div
                        aria-describedby="radix-:r4a:"
                        aria-labelledby="radix-:r49:"
                        className="popover relative left-1/2 col-auto col-start-2 row-auto row-start-2 w-full -translate-x-1/2 rounded-xl bg-token-main-surface-primary text-left shadow-xl transition-all flex flex-col focus:outline-none md:max-w-[680px]"
                        data-state="open"
                        id="radix-:r48:"
                        role="dialog"
                        style={{
                            pointerEvents: 'auto'
                        }}
                        tabIndex={-1}
                    >
                        <div className="px-4 pb-4 pt-5 sm:p-6 flex items-center justify-between border-b border-black/10 dark:border-white/10">
                            <div className="flex">
                                <div className="flex items-center">
                                    <div className="flex grow flex-col gap-1">
                                        <h2
                                            className="text-lg font-medium leading-6 text-token-text-primary"
                                            id="radix-:r49:"
                                        >
                                            Settings
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <button className="text-token-text-tertiary hover:text-token-text-secondary">
                                <svg
                                    fill="none"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6.34315 6.34338L17.6569 17.6571M17.6569 6.34338L6.34315 17.6571"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-grow overflow-y-auto">
                            <div
                                className="flex flex-col gap-6 md:flex-row"
                                data-orientation="horizontal"
                                dir="ltr"
                            >
                                <div
                                    aria-orientation="horizontal"
                                    className="m-2 md:m-0 md:px-4 md:pl-6 md:pt-4 flex flex-shrink-0 md:ml-[-8px] md:min-w-[180px] flex-row overflow-x-auto rounded-lg bg-token-main-surface-secondary"
                                    data-orientation="horizontal"
                                    role="tablist"
                                    style={{
                                        outline: 'none'
                                    }}
                                    tabIndex={0}
                                >
                                    <button
                                        aria-controls="radix-:r4b:-content-General"
                                        aria-selected="true"
                                        className="group flex items-center justify-start gap-2 rounded-md px-2 py-1.5 text-sm text-token-text-primary radix-state-active:bg-token-main-surface-tertiary radix-state-active:text-token-text-primary md:radix-state-active:bg-token-main-surface-secondary flex-1 justify-center"
                                        data-orientation="horizontal"
                                        data-radix-collection-item=""
                                        data-state="active"
                                        id="radix-:r4b:-trigger-General"
                                        role="tab"
                                        tabIndex={0}
                                        type="button"
                                    >
                                        <svg
                                            className="icon-sm"
                                            fill="none"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            width="24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M11.6439 3C10.9352 3 10.2794 3.37508 9.92002 3.98596L9.49644 4.70605C8.96184 5.61487 7.98938 6.17632 6.93501 6.18489L6.09967 6.19168C5.39096 6.19744 4.73823 6.57783 4.38386 7.19161L4.02776 7.80841C3.67339 8.42219 3.67032 9.17767 4.01969 9.7943L4.43151 10.5212C4.95127 11.4386 4.95127 12.5615 4.43151 13.4788L4.01969 14.2057C3.67032 14.8224 3.67339 15.5778 4.02776 16.1916L4.38386 16.8084C4.73823 17.4222 5.39096 17.8026 6.09966 17.8083L6.93502 17.8151C7.98939 17.8237 8.96185 18.3851 9.49645 19.294L9.92002 20.014C10.2794 20.6249 10.9352 21 11.6439 21H12.3561C13.0648 21 13.7206 20.6249 14.08 20.014L14.5035 19.294C15.0381 18.3851 16.0106 17.8237 17.065 17.8151L17.9004 17.8083C18.6091 17.8026 19.2618 17.4222 19.6162 16.8084L19.9723 16.1916C20.3267 15.5778 20.3298 14.8224 19.9804 14.2057L19.5686 13.4788C19.0488 12.5615 19.0488 11.4386 19.5686 10.5212L19.9804 9.7943C20.3298 9.17767 20.3267 8.42219 19.9723 7.80841L19.6162 7.19161C19.2618 6.57783 18.6091 6.19744 17.9004 6.19168L17.065 6.18489C16.0106 6.17632 15.0382 5.61487 14.5036 4.70605L14.08 3.98596C13.7206 3.37508 13.0648 3 12.3561 3H11.6439Z"
                                                stroke="currentColor"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                            />
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="2.5"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            />
                                        </svg>
                                        <div className="truncate">
                                            General
                                        </div>
                                    </button>
                                    <button
                                        aria-controls="radix-:r4b:-content-Personalization"
                                        aria-selected="false"
                                        className="group flex items-center justify-start gap-2 rounded-md px-2 py-1.5 text-sm text-token-text-primary radix-state-active:bg-token-main-surface-tertiary radix-state-active:text-token-text-primary md:radix-state-active:bg-token-main-surface-secondary flex-1 justify-center"
                                        data-orientation="horizontal"
                                        data-radix-collection-item=""
                                        data-state="inactive"
                                        id="radix-:r4b:-trigger-Personalization"
                                        role="tab"
                                        tabIndex={-1}
                                        type="button"
                                    >
                                        <svg
                                            className="icon-sm"
                                            fill="none"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            width="24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                clipRule="evenodd"
                                                d="M7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7ZM12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4Z"
                                                fill="currentColor"
                                                fillRule="evenodd"
                                            />
                                            <path
                                                d="M9.97992 14.095C10.09 14.6362 9.7406 15.1642 9.1994 15.2744C7.59635 15.6006 6.24138 16.2008 5.34538 17.0082C5.14268 17.1909 5 17.5256 5 18.0001V20.0001C5 20.5524 4.55228 21.0001 4 21.0001C3.44772 21.0001 3 20.5524 3 20.0001V18.0001C3 17.1764 3.24481 16.2088 4.00656 15.5224C5.2542 14.3982 6.98216 13.6845 8.8006 13.3145C9.34179 13.2044 9.86979 13.5538 9.97992 14.095Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                clipRule="evenodd"
                                                d="M17.4739 21.8806C21.3023 19.8204 22.6116 17.1105 21.7578 14.9761C21.3515 13.9603 20.4715 13.236 19.4151 13.0479C18.6065 12.9039 17.76 13.0829 17 13.5838C16.24 13.0829 15.3935 12.9039 14.5849 13.0479C13.5285 13.236 12.6485 13.9603 12.2422 14.9761C11.3884 17.1105 12.6977 19.8204 16.5261 21.8806C16.822 22.0398 17.178 22.0398 17.4739 21.8806ZM17.7188 15.5743C18.231 15.0448 18.7227 14.956 19.0645 15.0169C19.4251 15.0811 19.7452 15.3298 19.9009 15.7189C20.1584 16.3627 20.0618 18.0534 17 19.853C13.9382 18.0534 13.8416 16.3627 14.0991 15.7189C14.2548 15.3298 14.5749 15.0811 14.9355 15.0169C15.2773 14.956 15.7691 15.0448 16.2812 15.5743C16.4696 15.7691 16.729 15.8791 17 15.8791C17.271 15.8791 17.5304 15.7691 17.7188 15.5743Z"
                                                fill="currentColor"
                                                fillRule="evenodd"
                                            />
                                        </svg>
                                        <div className="truncate">
                                            Personalization
                                        </div>
                                    </button>
                                    <button
                                        aria-controls="radix-:r4b:-content-Speech"
                                        aria-selected="false"
                                        className="group flex items-center justify-start gap-2 rounded-md px-2 py-1.5 text-sm text-token-text-primary radix-state-active:bg-token-main-surface-tertiary radix-state-active:text-token-text-primary md:radix-state-active:bg-token-main-surface-secondary flex-1 justify-center"
                                        data-orientation="horizontal"
                                        data-radix-collection-item=""
                                        data-state="inactive"
                                        id="radix-:r4b:-trigger-Speech"
                                        role="tab"
                                        tabIndex={-1}
                                        type="button"
                                    >
                                        <svg
                                            className="icon-sm"
                                            fill="none"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            width="24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                clipRule="evenodd"
                                                d="M8 3a1 1 0 0 1 1 1v16a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1m8 2a1 1 0 0 1 1 1v12a1 1 0 1 1-2 0V6a1 1 0 0 1 1-1m-4 2a1 1 0 0 1 1 1v8a1 1 0 1 1-2 0V8a1 1 0 0 1 1-1M4 9a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0v-4a1 1 0 0 1 1-1m16 0a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0v-4a1 1 0 0 1 1-1"
                                                fill="currentColor"
                                                fillRule="evenodd"
                                            />
                                        </svg>
                                        <div className="truncate">
                                            Speech
                                        </div>
                                    </button>
                                    <button
                                        aria-controls="radix-:r4b:-content-DataControls"
                                        aria-selected="false"
                                        className="group flex items-center justify-start gap-2 rounded-md px-2 py-1.5 text-sm text-token-text-primary radix-state-active:bg-token-main-surface-tertiary radix-state-active:text-token-text-primary md:radix-state-active:bg-token-main-surface-secondary flex-1 justify-center"
                                        data-orientation="horizontal"
                                        data-radix-collection-item=""
                                        data-state="inactive"
                                        id="radix-:r4b:-trigger-DataControls"
                                        role="tab"
                                        tabIndex={-1}
                                        type="button"
                                    >
                                        <svg
                                            className="icon-sm"
                                            fill="none"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            width="24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                clipRule="evenodd"
                                                d="M6.00633 5.5C6.02321 5.53319 6.07042 5.60366 6.19525 5.70906C6.42458 5.9027 6.81573 6.12215 7.38659 6.32603C8.5196 6.73067 10.1506 7 12 7C13.8494 7 15.4804 6.73067 16.6134 6.32603C17.1843 6.12215 17.5754 5.9027 17.8048 5.70906C17.9296 5.60366 17.9768 5.53319 17.9937 5.5C17.9768 5.46681 17.9296 5.39634 17.8048 5.29094C17.5754 5.0973 17.1843 4.87785 16.6134 4.67397C15.4804 4.26933 13.8494 4 12 4C10.1506 4 8.5196 4.26933 7.38659 4.67397C6.81573 4.87785 6.42458 5.0973 6.19525 5.29094C6.07042 5.39634 6.02321 5.46681 6.00633 5.5ZM18 7.91726C17.7726 8.02403 17.5333 8.12123 17.2861 8.20951C15.8856 8.70968 14.0166 9 12 9C9.98341 9 8.1144 8.70968 6.71392 8.20951C6.46674 8.12123 6.22738 8.02403 6 7.91726V11.9866C6.00813 12.0073 6.03931 12.0661 6.14259 12.1624C6.31976 12.3277 6.63181 12.5252 7.10609 12.7189C8.04837 13.1039 9.43027 13.3932 11.051 13.476C11.6026 13.5042 12.0269 13.9741 11.9987 14.5257C11.9705 15.0773 11.5005 15.5016 10.949 15.4734C9.17744 15.3829 7.55934 15.0646 6.34969 14.5704C6.23097 14.5219 6.11419 14.4709 6 14.4173V18.4866C6.00813 18.5073 6.03931 18.5661 6.14259 18.6624C6.31976 18.8277 6.63181 19.0252 7.10609 19.2189C8.04837 19.6039 9.43027 19.8932 11.051 19.976C11.6026 20.0042 12.0269 20.4741 11.9987 21.0257C11.9705 21.5773 11.5005 22.0016 10.949 21.9734C9.17744 21.8829 7.55934 21.5646 6.34969 21.0704C5.74801 20.8246 5.19611 20.5146 4.77833 20.1249C4.35948 19.7341 4 19.1866 4 18.5V5.5C4 4.74631 4.43048 4.16346 4.90494 3.76283C5.38405 3.35829 6.01803 3.03902 6.71392 2.79049C8.1144 2.29032 9.98341 2 12 2C14.0166 2 15.8856 2.29032 17.2861 2.79049C17.982 3.03902 18.616 3.35829 19.0951 3.76283C19.5695 4.16346 20 4.74631 20 5.5V10C20 10.5523 19.5523 11 19 11C18.4477 11 18 10.5523 18 10V7.91726ZM17.5 13C18.0523 13 18.5 13.4477 18.5 14V14.6707C18.851 14.7948 19.172 14.9823 19.4492 15.2195L20.0308 14.8837C20.5091 14.6075 21.1207 14.7714 21.3968 15.2497C21.673 15.728 21.5091 16.3396 21.0308 16.6157L20.4499 16.9511C20.4828 17.1291 20.5 17.3125 20.5 17.5C20.5 17.6873 20.4828 17.8707 20.45 18.0485L21.0308 18.3838C21.5091 18.6599 21.6729 19.2715 21.3968 19.7498C21.1206 20.2281 20.5091 20.392 20.0308 20.1158L19.4495 19.7803C19.1722 20.0176 18.8511 20.2052 18.5 20.3293V21C18.5 21.5523 18.0523 22 17.5 22C16.9477 22 16.5 21.5523 16.5 21V20.3293C16.1489 20.2052 15.8277 20.0176 15.5504 19.7802L14.969 20.1159C14.4907 20.392 13.8791 20.2282 13.603 19.7499C13.3269 19.2716 13.4907 18.66 13.969 18.3839L14.55 18.0484C14.5172 17.8706 14.5 17.6873 14.5 17.5C14.5 17.3127 14.5172 17.1294 14.55 16.9515L13.9691 16.6161C13.4908 16.34 13.3269 15.7284 13.6031 15.2501C13.8792 14.7718 14.4908 14.608 14.9691 14.8841L15.5504 15.2197C15.8278 14.9824 16.1489 14.7948 16.5 14.6707V14C16.5 13.4477 16.9477 13 17.5 13ZM16.624 17.0174C16.6274 17.0117 16.6308 17.0059 16.6342 17.0001C16.6374 16.9946 16.6405 16.989 16.6436 16.9834C16.8187 16.6937 17.1367 16.5 17.5 16.5C17.8645 16.5 18.1835 16.6951 18.3583 16.9865C18.3607 16.9909 18.3632 16.9953 18.3658 16.9997C18.3685 17.0044 18.3713 17.0091 18.3741 17.0138C18.4543 17.1577 18.5 17.3235 18.5 17.5C18.5 17.6737 18.4557 17.8371 18.3778 17.9794C18.3737 17.9861 18.3697 17.9929 18.3657 17.9998C18.3619 18.0064 18.3581 18.0131 18.3545 18.0198C18.1789 18.3077 17.8619 18.5 17.5 18.5C17.1362 18.5 16.8178 18.3058 16.6428 18.0154C16.64 18.0102 16.6371 18.005 16.6341 17.9999C16.631 17.9945 16.6278 17.9891 16.6246 17.9838C16.5452 17.8404 16.5 17.6755 16.5 17.5C16.5 17.325 16.545 17.1605 16.624 17.0174Z"
                                                fill="currentColor"
                                                fillRule="evenodd"
                                            />
                                        </svg>
                                        <div className="truncate">
                                            Data controls
                                        </div>
                                    </button>
                                    <button
                                        aria-controls="radix-:r4b:-content-BuilderProfile"
                                        aria-selected="false"
                                        className="group flex items-center justify-start gap-2 rounded-md px-2 py-1.5 text-sm text-token-text-primary radix-state-active:bg-token-main-surface-tertiary radix-state-active:text-token-text-primary md:radix-state-active:bg-token-main-surface-secondary flex-1 justify-center"
                                        data-orientation="horizontal"
                                        data-radix-collection-item=""
                                        data-state="inactive"
                                        id="radix-:r4b:-trigger-BuilderProfile"
                                        role="tab"
                                        tabIndex={-1}
                                        type="button"
                                    >
                                        <svg
                                            className="icon-sm"
                                            fill="none"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            width="24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M14 12.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                clipRule="evenodd"
                                                d="M12 17.25c-.274 0-.681.137-1.318.731a1 1 0 1 1-1.364-1.462c.792-.74 1.67-1.269 2.682-1.269s1.89.53 2.682 1.269a1 1 0 0 1-1.364 1.462c-.637-.594-1.044-.731-1.318-.731Z"
                                                fill="currentColor"
                                                fillRule="evenodd"
                                            />
                                            <path
                                                clipRule="evenodd"
                                                d="M4 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V5Zm3-1a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H7Z"
                                                fill="currentColor"
                                                fillRule="evenodd"
                                            />
                                            <path
                                                clipRule="evenodd"
                                                d="M9 7a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1Z"
                                                fill="currentColor"
                                                fillRule="evenodd"
                                            />
                                        </svg>
                                        <div className="truncate">
                                            Builder profile
                                        </div>
                                    </button>
                                    <button
                                        aria-controls="radix-:r4b:-content-Security"
                                        aria-selected="false"
                                        className="group flex items-center justify-start gap-2 rounded-md px-2 py-1.5 text-sm text-token-text-primary radix-state-active:bg-token-main-surface-tertiary radix-state-active:text-token-text-primary md:radix-state-active:bg-token-main-surface-secondary flex-1 justify-center"
                                        data-orientation="horizontal"
                                        data-radix-collection-item=""
                                        data-state="inactive"
                                        id="radix-:r4b:-trigger-Security"
                                        role="tab"
                                        tabIndex={-1}
                                        type="button"
                                    >
                                        <svg
                                            className="icon-sm"
                                            fill="none"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            width="24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                clipRule="evenodd"
                                                d="M12.4 3.767a1 1 0 0 0-.8 0l-6 2.625a1 1 0 0 0-.6.916V13c0 1.714.616 3.283 1.638 4.5A6.99 6.99 0 0 1 12 15c2.153 0 4.078.972 5.362 2.5A6.97 6.97 0 0 0 19 13V7.308a1 1 0 0 0-.6-.916zm3.47 15.067A4.99 4.99 0 0 0 12 17a4.99 4.99 0 0 0-3.87 1.834A6.97 6.97 0 0 0 12 20c1.43 0 2.762-.43 3.87-1.166m-5.072-16.9a3 3 0 0 1 2.405 0l6 2.626A3 3 0 0 1 21 7.308V13a9 9 0 1 1-18 0V7.308A3 3 0 0 1 4.798 4.56zM12 8.5a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5m-3.75 1.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0"
                                                fill="currentColor"
                                                fillRule="evenodd"
                                            />
                                        </svg>
                                        <div className="truncate">
                                            Security
                                        </div>
                                    </button>
                                </div>
                                <div
                                    aria-labelledby="radix-:r4b:-trigger-General"
                                    className="max-h-[calc(100vh-150px)] w-full overflow-y-auto md:min-h-[380px] "
                                    data-orientation="horizontal"
                                    data-state="active"
                                    id="radix-:r4b:-content-General"
                                    role="tabpanel"
                                    style={{}}
                                    tabIndex={0}
                                >
                                    <div className="flex flex-col gap-3 px-4 pb-1 text-sm text-token-text-primary sm:px-6 sm:pb-2 md:pl-0 md:pt-5">
                                        <div className="border-b border-token-border-light pb-3 last-of-type:border-b-0">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    Theme
                                                </div>
                                                <button
                                                    aria-autocomplete="none"
                                                    aria-controls="radix-:r4m:"
                                                    aria-expanded="false"
                                                    className="text-token-text-primary border border-transparent inline-flex h-9 items-center justify-center gap-1 rounded-lg bg-white px-3 text-sm dark:transparent dark:bg-transparent leading-none outline-none cursor-pointer hover:bg-token-main-surface-secondary dark:hover:bg-token-main-surface-secondary focus-visible:border-green-500 dark:focus-visible:border-green-500 radix-state-active:text-token-text-secondary radix-disabled:cursor-auto radix-disabled:bg-transparent radix-disabled:text-token-text-tertiary dark:radix-disabled:bg-transparent"
                                                    data-state="closed"
                                                    dir="ltr"
                                                    role="combobox"
                                                    type="button"
                                                >
                                                    <span
                                                        style={{
                                                            pointerEvents: 'none'
                                                        }}
                                                    >
                                                        System
                                                    </span>
                                                    <span aria-hidden="true">
                                                        <svg
                                                            className="icon-sm"
                                                            fill="none"
                                                            height="1em"
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            viewBox="0 0 24 24"
                                                            width="1em"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <polyline points="6 9 12 15 18 9" />
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="border-b border-token-border-light pb-3 last-of-type:border-b-0">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    Always show code when using data analyst
                                                </div>
                                                <button
                                                    aria-checked="true"
                                                    aria-label="Always show code when using data analyst"
                                                    className="cursor-pointer bg-gray-200 radix-state-checked:!bg-green-600 dark:border dark:border-token-border-medium dark:bg-transparent relative shrink-0 rounded-full dark:radix-state-checked:border-green-600 h-[20px] w-[32px]"
                                                    data-state="checked"
                                                    role="switch"
                                                    type="button"
                                                    value="on"
                                                >
                                                    <span
                                                        className="flex items-center justify-center rounded-full translate-x-0.5 transition-transform duration-100 will-change-transform bg-white shadow-[0_1px_2px_rgba(0,0,0,0.45)] h-[16px] w-[16px] radix-state-checked:translate-x-[14px]"
                                                        data-state="checked"
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="border-b border-token-border-light pb-3 last-of-type:border-b-0">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div>
                                                        Archived chats
                                                    </div>
                                                </div>
                                                <button className="btn relative btn-neutral">
                                                    <div className="flex w-full gap-2 items-center justify-center">
                                                        Manage
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="border-b border-token-border-light pb-3 last-of-type:border-b-0">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div>
                                                        Archive all chats
                                                    </div>
                                                </div>
                                                <button className="btn relative btn-neutral">
                                                    <div className="flex w-full gap-2 items-center justify-center">
                                                        Archive all
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="border-b border-token-border-light pb-3 last-of-type:border-b-0">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div>
                                                        Delete all chats
                                                    </div>
                                                </div>
                                                <button className="btn relative btn-danger">
                                                    <div className="flex w-full gap-2 items-center justify-center">
                                                        Delete all
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    aria-labelledby="radix-:r4b:-trigger-BetaFeatures"
                                    className="max-h-[calc(100vh-150px)] w-full overflow-y-auto md:min-h-[380px] "
                                    data-orientation="horizontal"
                                    data-state="inactive"
                                    hidden
                                    id="radix-:r4b:-content-BetaFeatures"
                                    role="tabpanel"
                                    tabIndex={0}
                                />
                                <div
                                    aria-labelledby="radix-:r4b:-trigger-DataControls"
                                    className="max-h-[calc(100vh-150px)] w-full overflow-y-auto md:min-h-[380px] "
                                    data-orientation="horizontal"
                                    data-state="inactive"
                                    hidden
                                    id="radix-:r4b:-content-DataControls"
                                    role="tabpanel"
                                    tabIndex={0}
                                />
                                <div
                                    aria-labelledby="radix-:r4b:-trigger-Personalization"
                                    className="max-h-[calc(100vh-150px)] w-full overflow-y-auto md:min-h-[380px] "
                                    data-orientation="horizontal"
                                    data-state="inactive"
                                    hidden
                                    id="radix-:r4b:-content-Personalization"
                                    role="tabpanel"
                                    tabIndex={0}
                                />
                                <div
                                    aria-labelledby="radix-:r4b:-trigger-BuilderProfile"
                                    className="max-h-[calc(100vh-150px)] w-full overflow-y-auto md:min-h-[380px] "
                                    data-orientation="horizontal"
                                    data-state="inactive"
                                    hidden
                                    id="radix-:r4b:-content-BuilderProfile"
                                    role="tabpanel"
                                    tabIndex={0}
                                />
                                <div
                                    aria-labelledby="radix-:r4b:-trigger-Speech"
                                    className="max-h-[calc(100vh-150px)] w-full overflow-y-auto md:min-h-[380px] "
                                    data-orientation="horizontal"
                                    data-state="inactive"
                                    hidden
                                    id="radix-:r4b:-content-Speech"
                                    role="tabpanel"
                                    tabIndex={0}
                                />
                                <div
                                    aria-labelledby="radix-:r4b:-trigger-Security"
                                    className="max-h-[calc(100vh-150px)] w-full overflow-y-auto md:min-h-[380px] "
                                    data-orientation="horizontal"
                                    data-state="inactive"
                                    hidden
                                    id="radix-:r4b:-content-Security"
                                    role="tabpanel"
                                    tabIndex={0}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingProvider