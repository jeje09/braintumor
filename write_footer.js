const fs = require('fs');
const content = import React from 'react';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#1c2a38] text-slate-300 py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-black text-white mb-16 text-center leading-relaxed">
          암 때문에 죽는 것이 아니라,<br className="md:hidden" />
          암과 함께 살아가는 길을 찾습니다.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 text-[15px] leading-loose break-keep font-medium">
          {/* Left Column */}
          <div className="space-y-6 text-slate-300">
            <p>
              모든 암세포를 하나도 남김없이 찾아내 없앨 수 있다면 가장 좋겠습니다.<br />
              그러나 그것이 언제나 가능한 것은 아닙니다.
            </p>
            <p>
              그래서 우리는 또 다른 길을 선택합니다.<br />
              암과 끝없는 전쟁만 하는 것이 아니라,<br />
              몸과 마음을 지키며 오늘을 살아가는 길입니다.
            </p>
            <p>
              때로는 어르고, 때로는 달래며,<br />
              조용히 공존할 수 있다면 그것 또한 삶의 지혜입니다.
            </p>
          </div>

          {/* Right Column */}
          <div className="space-y-6 text-slate-300">
            <p>
              암은 내 삶의 전부가 아닙니다.<br />
              암은 내 이름도, 내 꿈도, 내 사랑도 될 수 없습니다.
            </p>
            <p>
              오늘도 웃을 이유를 찾고,<br />
              사랑하는 사람과 함께하며,<br />
              희망을 잃지 않는다면 우리는 이미 잘 살아가고 있는 것입니다.
            </p>
            <div className="pt-6 border-t border-slate-700/50 mt-2">
              <p className="font-extrabold text-white text-base leading-relaxed">
                절망하지 마십시오.<br />
                우리는 암과 싸우기만 하는 사람들이 아니라,<br />
                암과 함께도 끝까지 삶을 살아내는 사람들입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
;
fs.writeFileSync('f:/braintumor/src/components/Footer.jsx', content, 'utf8');
