export function Badge({ children, isNew }: { children: React.ReactNode; isNew?: boolean }) {
    return <span className={'badge ' + (isNew ? 'green' : '')}>{children}</span>;
}
