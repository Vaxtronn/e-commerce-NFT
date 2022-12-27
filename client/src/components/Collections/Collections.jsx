import * as actions from '../../redux/actions'
import { useSelector } from "react-redux";
import { useEffect } from 'react'; 
import { useDispatch } from "react-redux";
import Loading from '../Loading/Loading';
import { Link } from "react-router-dom";
import "./Collections.css"
import VerifiedIcon from '@mui/icons-material/Verified';

function Collections(){

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getAllNfts())
    dispatch(actions.getAllCollections())
  },[dispatch]);

  const nfts = useSelector((state) => state.nfts);
  const collections = useSelector((state) => state.collections);
  const isLoading = useSelector(state => state.isLoading);

  const collectionsCards = collections.map((collection) => {
    return (
      <Link to={`/collections/${collection.id}`}>
        <div className='collections-conteiner'>
          <img className='collections-img-main' src={collection.image} alt="img-collections" />
          <div className='img-name-conteiner'>
            <img className='collections-img-owner' src={collection.nfts[0].image} alt="img-collections" />
            <div className='collection-name-conteiner'>             
            <VerifiedIcon/>
            <h3 className='collections-name'> {collection.name} </h3>
            </div>
          </div>
        </div>
      </Link>
    );
  });
  
  return(
    <div className='conteiner-main-collections'>
      { 
        isLoading ? <Loading/> : collectionsCards
      }
    </div>
  )
}

export default Collections;