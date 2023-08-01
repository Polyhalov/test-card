import { useState } from "react";

const User = ({ items }) => {
    const [currentItems, setCurrentItems] = useState(items)
    console.log(currentItems)
    return (
        <div>
        </div>
    )
}
export default User;