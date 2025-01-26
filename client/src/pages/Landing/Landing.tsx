// import CarSvg from './components/ui/carSvg'
import { CatHome } from '@/components/ui';

const Landing = () => {
  return (
      <div className="not-found"> 
        <div style={{ backgroundColor: "#CBDED9", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div>
            <CatHome/>
          </div>
        </div>

      {/* <CarSvg /> */}
    </div>
  );
};

export default Landing;
