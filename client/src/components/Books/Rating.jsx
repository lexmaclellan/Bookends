import { FaStar, FaRegStarHalf, FaRegStar } from 'react-icons/fa'

const Rating = ({ value, text }) => {
    let hasValue
    if (value)
        hasValue = true
    else
        hasValue = false
  return (
    <>
        {hasValue
            ?
                <section className='rating flex mb-2'>
                    <span className='flex-col'>
                        { value >= 1 ? <FaStar /> : value >= 0.5 ? <FaRegStarHalf /> : <FaRegStar /> }
                    </span>
                    <span className='flex-col'>
                        { value >= 2 ? <FaStar /> : value >= 1.5 ? <FaRegStarHalf /> : <FaRegStar /> }
                    </span>
                    <span className='flex-col'>
                        { value >= 3 ? <FaStar /> : value >= 2.5 ? <FaRegStarHalf /> : <FaRegStar /> }
                    </span>
                    <span className='flex-col'>
                        { value >= 4 ? <FaStar /> : value >= 3.5 ? <FaRegStarHalf /> : <FaRegStar /> }
                    </span>
                    <span className='flex-col'>
                        { value >= 5 ? <FaStar /> : value >= 4.5 ? <FaRegStarHalf /> : <FaRegStar /> }
                    </span>
                    <span className='rating-text flex-col'>{ text && text }</span>
                </section>
            :
                <section className='rating mb-2'>
                </section>
        }
    </>
  )
}


export default Rating