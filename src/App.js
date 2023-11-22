import {useState, useEffect} from "react"
import Nav from "./components/Nav"
import Header from "./components/Header"
import Feed from "./components/Feed"
import PopUp from "./components/PopUp"
import WriteIcon from "./components/WriteIcon";

const App = () => {
    const [user, setUser] = useState(null)
    const [threads, setThreads] = useState(null)
    const [viewThreadsFeed, setViewThreadsFeed] = useState(true)
    const [filteredThreads, setFilteredThreads] = useState(null)
    const [openPopUp, setOpenPopUp] = useState(false)
    const [interactingThread, setInteractingThread] = useState(null)
    const [popUpFeedThreads, setPopUpFeedThreads] = useState(null)

    const userId = "b0e3f10e-9b4a-463d-a210-c11b0c4c5c93"

    const getUser = async () => {
        const response = await fetch(`http://localhost:3000/users?user_uuid=${userId}`)
        const data = await response.json()
        setUser(data[0])
        try {

        } catch (error) {
            console.error(error)
        }
    }

    const getThreads = async () => {
        try {
            const response = await fetch(`http://localhost:3000/threads?threads_from=${userId}`)
            const data = await response.json()
            setThreads(data)
        } catch (error) {
            console.error(error)
        }
    }

    const getThreadsFeed = () => {
        if (viewThreadsFeed) {
            const standAloneThreads = threads?.filter(thread => thread.reply_to === null)
            setFilteredThreads(standAloneThreads)
        }
        if (!viewThreadsFeed) {
            const replyThreads = threads?.filter(thread => thread.reply_to !== null)
            setFilteredThreads(replyThreads)
        }
    }

    const getReplies = async () => {
        try {
            const response = await fetch(`http://localhost:3000/threads?reply_to${interactingThread?.id}`)
            const data = await response.json()
            setPopUpFeedThreads(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getReplies()
    }, [interactingThread]);

    useEffect(() => {
        getUser()
        getThreads()
    }, [])

    useEffect(() => {
        getThreadsFeed()
    }, [user, threads, viewThreadsFeed]);


    return (
        <>
            {user && <div className="app">
                <Nav url={user.instagram_url}/>
                <Header
                    user={user}
                    viewThreadsFeed={viewThreadsFeed}
                    setViewThreadsFeed={setViewThreadsFeed}
                />
                <Feed
                    user={user}
                    setOpenPopUp={setOpenPopUp}
                    filteredThreads={filteredThreads}
                    getThreads={getThreads}
                    setInteractingThread={setInteractingThread}
                />
                {openPopUp &&
                    <PopUp
                        user={user}
                        setOpenPopUp={setOpenPopUp}
                        popUpFeedThreads={popUpFeedThreads}
                    />}
                <div onClick={() => setOpenPopUp(true)}>
                    <WriteIcon/>
                </div>
            </div>}

        </>

    )
}

export default App
