import { searchPosts } from "api/api";
import { useEffect, useState } from "react";
import css from './css.module.css'


const UserList = () => {

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    
    
    
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const itemFromLocal = localStorage.getItem('items');
                if (itemFromLocal !== null&&page===1) {
                    const parsedItems = JSON.parse(itemFromLocal);
                    setItems(parsedItems);
                    return
                }
                setLoading(true);
                const response = await searchPosts(page);
                setItems(prevItems => [...prevItems, ...response.data])
                

            } catch (error) {
                
            }
        }
        fetchPost()
    }, [page])

    useEffect(() => {
        setCurrentItems(items);
        localStorage.setItem('items', JSON.stringify(items));
    }, [items,items.isFollow])

    


    const loadMore = () => {
        setPage(prevPage => prevPage + 1);
    }

    const handleFollow = (id) => {
        setItems(items.map((prevItem) => prevItem.id === id ? { ...prevItem, isFollow: !prevItem.isFollow } : prevItem));
    }

    const handleChange = (e) => {

        if (e.target.value === 'All') {
            setCurrentItems(items)
        } else if (e.target.value === 'Follow')
            setCurrentItems(items.filter((prevItem) => prevItem.isFollow == true));
        else {
            setCurrentItems(items.filter((Item) => Item.isFollow !== true));
        }
       
    }

    
    
    const elements = currentItems.map((item) => (<li key={item.id}>
        <div className={css.box}>
            <img src="../../images/Logo.png" alt="" />
            <div className={css.info}>
                <img className={css.photo} src={item.avatar} alt={item.user} />
                <span className={css.followers}> {item.tweets} &nbsp; Tweets</span>
                <span className={css.followers}>{item.isFollow === true ? item.followers + 1 : item.followers} &nbsp; Followers</span>
                <button className={item.isFollow ? css.btnColor : css.btn} onClick={() =>
                { handleFollow(item.id) }}>{item.isFollow ? <span>Following</span>:<span>Follow</span>}</button>
            </div>
        </div>
    </li>))

    return (
        <div className={css.layout}>
            <label htmlFor="followers-select">Choose a followers:</label>

<select name="pets" onChange={handleChange} id="followers-select">
   <option value="All">All</option>
    <option value="Follow">Follow</option>
    <option value="Unfollow">Unfollow</option>
</select>
            <ul className={css.list}>
                {elements}
            </ul>
            {items.length<12 && <button className={css.loadButton} onClick={loadMore}>Load More</button>}
            
        </div>
    )
}

export default UserList;