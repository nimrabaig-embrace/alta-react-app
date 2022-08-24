import Sidebar from "../components/Sidebar";

const PageLayout = ({ children }: any) => (
  <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
    <div>
      <Sidebar />
    </div>
    <div style={{width: "100%"}}>
      <div style={{ padding: 25 }}>{children}</div>
    </div>
  </div>
);

export default PageLayout;
