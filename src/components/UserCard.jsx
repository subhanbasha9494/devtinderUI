const UserCard = ({ users }) => {
    return (
        <div className="flex p-4 my-4 flex-wrap justify-center">
            {users.map((user) => (
                <div key={user._id} className="user-card">
                    <div className="card bg-base-100 w-96 shadow-sm">
                        <img
                            src="https://cdn.vectorstock.com/i/500p/29/52/faceless-male-avatar-in-hoodie-vector-56412952.jpg"
                            alt="Shoes" />
                        <div className="card-body">
                            <h2 className="card-title">{user.firstName}</h2>
                            <p>{user.about}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default UserCard;