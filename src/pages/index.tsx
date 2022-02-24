import { FirebaseProps } from '../config/firebaseProps';
import { RankScreen } from '../routes/RankScreen';

const IndexPage = () => (
  <FirebaseProps>
    <RankScreen />
  </FirebaseProps>
);

export default IndexPage;
