import { useState } from "react"
import './folder.css'

const Folder = ({ explorer }) => {
    const [expand, setExpand] = useState(false);
    if (explorer.isFolder) {
        return (
            <div style={{marginTop:'5px'}}>
                <div className="folder" onClick={() => setExpand(!expand)}>
                    <span>📁{explorer.name}</span>
                </div>
                <div style={{ display: expand ? "block" : "none", marginLeft: '20px' }}>
                    {explorer.items.map((exp) => <Folder explorer={exp} key={exp.id} />)}
                </div>
            </div>
        )
    }
    else {
        return <span className="file">📄{explorer.name}</span>
    }
}

export default Folder;