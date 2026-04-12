import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { BookOpen, Sparkles, RotateCcw, Download } from "lucide-react";
import html2canvas from "html2canvas";

const STUDY_METHODS = [
  { keywords: ["철학", "인문", "생각"], title: "데카르트 공부법", desc: "나는 시험 생각을 안 한다. 고로 시험은 존재하지 않는다." },
  { keywords: ["경제", "경영", "돈", "주식"], title: "애덤스미스 공부법", desc: "보이지 않는 손이 대신 시험지를 채워줄 것이다." },
  { keywords: ["물리", "과학", "공대", "관성"], title: "뉴턴의 관성 공부법", desc: "한 번 누우면 계속 누워 있게 되는 물리 법칙을 이용함." },
  { keywords: ["컴공", "코딩", "컴퓨터", "개발", "IT"], title: "컴공과 이진법 공부법", desc: "아는 것(1)과 모르는 것(0)을 확실히 구분하려다 0만 남음." },
  { keywords: ["과학", "양자", "슈뢰딩거"], title: "슈뢰딩거의 공부법", desc: "시험지를 열기 전까지 나는 합격과 불합격 상태가 공존한다." },
  { keywords: ["잠", "졸려", "수면", "조건반사"], title: "파블로프 공부법", desc: "책을 펼치면 자동으로 잠이 오는 조건반사를 완성함." },
  { keywords: ["과학", "시간", "벼락치기", "상대성"], title: "아인슈타인 상대성 공부법", desc: "시험 전날 밤은 상대적으로 매우 짧다." },
  { keywords: ["생물", "진화", "생명"], title: "다윈 진화론 공부법", desc: "적자생존. 시험에서 살아남은 자만이 졸업한다." },
  { keywords: ["생물", "dna", "생명"], title: "DNA 공부법", desc: "첫눈에 알아본 밥으로 찍음." },
  { keywords: ["철학", "윤리", "모름"], title: "소크라테스 공부법", desc: "나는 내가 모른다는 것을 안다. 그래서 그냥 안 함." },
  { keywords: ["수학", "통계", "운"], title: "피타고라스 공부법", desc: "성적² = 노력² + 운²  …결국 운이 더 크다." },
  { keywords: ["넷플릭스", "유튜브", "영화", "취미"], title: "타노스 공부법", desc: "반만 외운다." },
  { keywords: ["운동", "헬스", "근육", "체육"], title: "근성장 공부법", desc: "공부도 근성장처럼 휴식이 제일 중요하다며 하루 종일 누워 있음." },
  { keywords: ["음악", "비트"], title: "4분 쉼표 공부법", desc: "인생이라는 악보에 4분 쉼표를 찍고 고요하게 명상만 함." },
  { keywords: ["음악", "케이팝", "트와이스"], title: "트와이스 공부법", desc: "원인어밀리언! 시험범위는 백만, 난 그 중에서 하나만 판다." },
  { keywords: ["음악", "케이팝", "지드래곤"], title: "지드래곤 공부법", desc: "이번 학기는 삐딱하게 무제 답안지다." },
  { keywords: ["디자인", "미술", "미대"], title: "누끼 따기 공부법", desc: "시험 범위에서 내가 아는 부분만 누끼 따려다 배경(모르는 것)만 남음." },
  { keywords: ["심리", "마음", "분석"], title: "독심술 공부법", desc: "공부 대신 교수님의 마음을 읽어본다." },
  { keywords: ["게임", "롤", "lol", "리그오브레전드"], title: "점멸 공부법", desc: "D냐 F냐..." },
  { keywords: ["간호", "의학", "응급"], title: "심폐소생술 공부법", desc: "이미 사망한 내 성적에 심폐소생술을 시도하지만 골든타임을 놓침." },
  { keywords: ["법학", "법", "유예"], title: "집행유예 공부법", desc: "이번 학기 성적 처벌을 다음 학기로 유예해달라고 기도함." },
  { keywords: ["사회", "정치","외교", "협상"], title: "다자간 협상 공부법", desc: "뇌세포들과 공부 여부를 협상하다가 7시간째 결렬됨." },
  { keywords: ["화학", "실험", "농도"], title: "농도 조절 공부법", desc: "지식의 농도를 0%로 유지하여 어떠한 유해한 반응도 차단함." },
  { keywords: ["역사", "사학과", "기록"], title: "이순신 공부법", desc: "나의 정답을 교수님께 알리지 않는다." },
  { keywords: ["동물", "수의", "생명"], title: "사슴 공부법", desc: "D-1, 사슴은 사자에게 쫓길 때 극도의 집중력이 발휘되는 법임." },
  { keywords: ["환경", "식물", "원예", "농사"], title: "배추 공부법", desc: "포기한다." },
  { keywords: ["환경", "식물", "원예", "농사"], title: "수박 공부법", desc: "겉핥기 식으로 첫장과 맨끝장만 본다." },
  { keywords: ["체육", "운동", "올림픽"], title: "올림픽 공부법", desc: "참가하는데 의의를 둔다." },
  { keywords: ["음악", "노래", "아이유"], title: "아이유 공부법", desc: "손틈새로 비치는 부분만 판다" },
  { keywords: ["음악", "밴드", "데이식스"], title: "데이식스 공부법", desc: "한 페이지만 공부한다." },
  { keywords: ["해양", "통영", "수영"], title: "인어공주 공부법", desc: "Under the C~" },
  { keywords: ["지우"], title: "지우 공부법", desc: "공부를 안 함....." },
  { keywords: ["경상국립대", "경상대", "지누"], title: "지누 공부법", desc: "지누가 경상대를 부숴주기를 기다림." }
  
];

type Screen = "start" | "input" | "loading" | "result";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("start");
  const [traits, setTraits] = useState("");
  const [result, setResult] = useState(STUDY_METHODS[0]);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleStart = () => setScreen("input");

  // 2. 맞춤 추천 로직 구현
  const handleSubmit = () => {
  if (!traits.trim()) return;
  setScreen("loading");
  
  setTimeout(() => {
    const input = traits.toLowerCase().replace(/\s/g, ""); // 공백 제거 후 소문자로
    
    // 로직 변경: 입력값에 키워드가 "포함"되어 있는지 확인
    const matched = STUDY_METHODS.filter(method => 
      method.keywords.some(keyword => input.includes(keyword.toLowerCase()))
    );

    const pool = matched.length > 0 ? matched : STUDY_METHODS;
    const random = pool[Math.floor(Math.random() * pool.length)];
    
    setResult(random);
    setScreen("result");
  }, 2000);
};

  const handleReset = () => {
    setTraits("");
    setScreen("start");
  };

  const handleSaveImage = async () => {
    if (!resultRef.current) return;
    const canvas = await html2canvas(resultRef.current, { backgroundColor: "#fffaf5", scale: 2 });
    const link = document.createElement("a");
    link.download = "가짜공부법_결과.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  // UI 렌더링 부분 (기존과 동일하지만 상태와 연동됨)
  if (screen === "start") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 bg-[#fffaf5]">
        <div className="animate-bounce-slow text-orange-500">
          <BookOpen size={80} strokeWidth={1.5} />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">교수님 뒷목 잡는 공부법 생성기</h1>
          <p className="mt-3 text-muted-foreground max-w-md">
            당신의 특징을 입력하면 찰떡같은 공부법을 추천해드림
          </p>
        </div>
        <Button size="lg" className="text-lg px-8 py-6 bg-orange-500 hover:bg-orange-600" onClick={handleStart}>
          <Sparkles className="mr-2" size={20} />
          시작하기
        </Button>
      </div>
    );
  }

  if (screen === "input") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 bg-[#fffaf5]">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-2">📝 당신에 대해 알려주세요</h2>
          <p className="text-muted-foreground text-center text-sm mb-6">
            학과나 취미를 적으면 찰떡 공부법을 추천해드립니다
          </p>
          <Input
            placeholder="예: 컴퓨터공학과, 철학과, 노래, 운동 등"
            value={traits}
            onChange={(e) => setTraits(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="text-base py-6 mb-4 border-orange-200 focus:ring-orange-500"
          />
          <Button className="w-full py-6 text-lg bg-orange-500 hover:bg-orange-600" onClick={handleSubmit} disabled={!traits.trim()}>
            추천받기 🎯
          </Button>
        </div>
      </div>
    );
  }

  if (screen === "loading") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 bg-[#fffaf5]">
        <div className="text-orange-500 animate-spin-slow">
          <BookOpen size={60} strokeWidth={1.5} className="animate-bounce-slow" />
        </div>
        <p className="text-lg font-medium text-center">
          전국의 공부 고수들에게 자문을 구하는 중...
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-6 px-4 py-8 bg-[#fffaf5]">
      {/* 1. 결과 콘텐츠 (가운데 정렬 유지) */}
      <h2 className="text-xl font-bold text-center animate-fade-in-up">
        🎓 당신에게 딱 맞는 공부법은?
      </h2>
      <div ref={resultRef} className="w-full max-w-md">
        <Card className="p-8 animate-fade-in-up border-2 border-orange-200 bg-white shadow-xl">
          <div className="text-center">
            <span className="text-5xl mb-4 block">📚</span>
            <h3 className="text-2xl font-bold text-orange-600 mb-3">{result.title}</h3>
            <p className="text-foreground text-lg leading-relaxed">{result.desc}</p>
            <p className="mt-6 text-xs text-muted-foreground border-t pt-4">입력한 특징: {traits}</p>
          </div>
        </Card>
      </div>
      <div className="flex gap-3 animate-fade-in-up">
        <Button variant="outline" size="lg" onClick={handleReset} className="border-orange-200 text-orange-600">
          <RotateCcw className="mr-2" size={18} />
          다시 하기
        </Button>
        <Button size="lg" onClick={handleSaveImage} className="bg-orange-500 hover:bg-orange-600">
          <Download className="mr-2" size={18} />
          이미지로 저장
        </Button>
      </div>

      {/* 2. 푸터 (콘텐츠와 상관없이 맨 아래 고정) */}
      <footer className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-sm text-muted-foreground">
          © 2026 Made by <a href="https://www.instagram.com/_916_ju/" target="_blank" className="font-semibold text-orange-500">@_916_ju</a>
        </p>
      </footer>
    </div>
  );
}

export default Index;