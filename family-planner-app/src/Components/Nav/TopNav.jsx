import { useAuth } from "../../Hooks/useAuth"

const TopNav = () => {
    const { user } = useAuth()

    console.log(user)

    return (
        <div className="max-w-full h-24 bg-grey fixed top-0 right-0 left-0 z-10">
            Hello World!
        </div>
    )
}

export default TopNav