import { useLocation, useNavigate } from "react-router-dom";



function CoinDetailPage() {

    const { state } = useLocation();
    const navigate = useNavigate()

    return (
        <div className="mt-5 px-3 flex flex-col justify-between h-[100ch]">
            <div>
                <div className="flex flex-col items-center gap-2">
                    <img src={state.logo} width={41} height={40} />
                    <h4 className="text-xs text-[#41474Fs]">
                        {state.name.fa}
                        <span className="mr-1">({state.base_currency_symbol.en.toLocaleUpperCase()})</span>
                    </h4>
                </div>
                <div className="mt-10">
                    <div className="flex items-center justify-between mb-2">
                        <h6 className="text-[#62676E] text-xs">نام انگلیسی</h6>
                        <h6 className="text-[#41474F] text-xs">{state.name.en.split("/")[0]}</h6>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <h6 className="text-[#62676E] text-xs">قیمت</h6>
                        <h6 className="text-[#41474F] text-xs" style={{ direction: "ltr" }}>{state.buy.toLocaleString()} IRR</h6>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <h6 className="text-[#62676E] text-xs">تغییرات 24 ساعته</h6>
                        <h6 className="text-[#41474F] text-xs">% {state.financial.last24h.change_percent}</h6>
                    </div>
                    <div className="flex items-center justify-between">
                        <h6 className="text-[#62676E] text-xs">حجم معاملاتی</h6>
                        <h6 className="text-[#41474F] text-xs">{state.financial.last24h.quote_volume}</h6>
                    </div>
                </div>
            </div>
            <div>
                <button className="border border-[#E4E5E6] text-[#1F2630] text-sm w-full rounded-lg py-3 mb-5"
                    onClick={() => navigate(-1)}
                >
                    بازگشت
                </button>
            </div>
        </div>
    );
}

export default CoinDetailPage;