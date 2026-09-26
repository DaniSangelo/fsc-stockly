import Header, { HeaderLeft, HeaderSubtitle, HeaderTitle } from "./_components/header";

export default function Home() {
  return (
    <div className="m-8 flex h-[calc(100vh-4rem)] min-w-0 flex-1 flex-col gap-8 rounded-lg bg-white p-8">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle> Dashboard</HeaderSubtitle>
          <HeaderTitle> Dashboard</HeaderTitle>
        </HeaderLeft>
      </Header>
      <div className="min-h-0 flex-1 overflow-y-auto"></div>
    </div>
  );
}
