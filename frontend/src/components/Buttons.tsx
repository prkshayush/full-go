
type ButtonProps = {
    text: string,
    url: string
}

export const Buttons = ({ text, url }: ButtonProps) => {
    return (
        <div className="bg-blue-700 text-slate-200 rounded-md px-4 py-2 font-semibold w-fit">
            <a href={url}>
                <p>{text}</p>
            </a>
        </div>
    )
}
