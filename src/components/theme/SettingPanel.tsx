
const SettingPanel = () => {
    const changeTheme = (color: string) => {
        document.documentElement.style.setProperty('--background-color', color);
    }

    return (
        <div>
            <button>Menu</button>
            <div>
            <button onClick={() => changeTheme('--indigo-800')}>Indigo Dark</button>
            <button onClick={() => changeTheme('#333333')}>Dark</button>
            <button onClick={() => changeTheme('#FFD700')}>Gold</button>
        </div>
        </div>
    )
}

export default SettingPanel;