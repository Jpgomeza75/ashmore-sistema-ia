import SystemMap from "@/components/SystemMap";

export default function Index() {
  return (
    <div
      className="flex-1 min-h-0 flex flex-col overflow-hidden"
      style={{ background: "#F5F2EC" }}
    >
      <div
        className="flex-1 min-h-0 flex overflow-hidden"
        style={{
          paddingTop: 32,
          paddingRight: 32,
          paddingBottom: 32,
          paddingLeft: 24,
        }}
      >
        <SystemMap />
      </div>
    </div>
  );
}
