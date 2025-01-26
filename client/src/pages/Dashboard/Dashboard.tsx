import { CatHome } from '@/components/ui';

const Dashboard = () =>  {
  return (
      <div className="Cat-Home"> 
        <div style={{ backgroundColor: "#CBDED9", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div>
            <CatHome/>
          </div>
        </div>
    </div>
  );
};

export default Dashboard;

