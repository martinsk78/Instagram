import { useState } from "react";
import PropTypes from "prop-types";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import AddComment from "./add-comment";

export default function Comments({
	docId,
	comments: allComments,
	posted,
	commentInput,
}) {
	const [comments, setComments] = useState(allComments);
	const [showComments, setShowComments] = useState(false);
	return (
		<>
			<div className="p-4 pt-1 pb-4">
				{comments.length >= 3 && (
					<p className="text-sm text-gray-base mb-1 cursor-pointer"
                    onClick={()=>{
                        console.log(showComments)
                            setShowComments(!showComments)}}>
							{showComments ? `View Less Comments` : `View All ${comments.length} comments`}
						
					</p>
				)}
				{showComments ? (comments.map((item) => (
					<p
						key={`${item.comment}-${item.displayName}`}
						className="mb-1"
					>
						<Link to={`/p/${item.displayName}`}>
							<span className="mr-1 font-bold">
								{item.displayName}
							</span>
						</Link>
						<span>{item.comment}</span>
					</p>
				))):(comments.slice(0, 2).map((item) => (
					<p
						key={`${item.comment}-${item.displayName}`}
						className="mb-1"
					>
						<Link to={`/p/${item.displayName}`}>
							<span className="mr-1 font-bold">
								{item.displayName}
							</span>
						</Link>
						<span>{item.comment}</span>
					</p>
				)))}
				<p className="text-gray-base uppercase text-xs mt-2">
					{" "}
					{formatDistance(posted, new Date())}{" "}
				</p>
			</div>
			<AddComment
				docId={docId}
				comments={comments}
				setComments={setComments}
				commentInput={commentInput}
			/>
		</>
	);
}

Comments.propTypes = {
	docId: PropTypes.string.isRequired,
	comments: PropTypes.array.isRequired,
	posted: PropTypes.number.isRequired,
	commentInput: PropTypes.object.isRequired,
};
