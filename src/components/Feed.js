import Thread from "./Thread";

const Feed = ({ user, filteredThreads }) => {
    return (
        <div className="feed">
            {filteredThreads?.map(ft => <Thread key={ft.id} user={user} filteredThread={ft}/>)}
        </div>

    )
}

export default Feed
