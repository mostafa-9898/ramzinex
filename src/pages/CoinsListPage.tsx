import { useEffect, useState } from "react"

// services
import { getAllCoins } from "../services/requests";

// hooks
import useDebounce from "../hooks/useDebounce";
import { useNavigate } from "react-router-dom";

// components
import Loading from "../components/Loading";

// models
import { ICoinDetail } from "../interfaces/CoinDetail";


function CoinsListPage() {

    const [coinsList, setCoinsList] = useState<ICoinDetail[]>([])
    const [loading, setLoading] = useState(false)
    const [inputSearch, setInputSearch] = useState('')
    const [letsSort, SetLetsSort] = useState<"name" | "price">()

    const navigate = useNavigate()
    const debouncedSearchValue = useDebounce(inputSearch, 1000)

    useEffect(() => {
        setLoading(true)
        if (inputSearch) {
            let letsSearch = coinsList.filter(item => item.name.fa.toLowerCase().includes(inputSearch.toLowerCase()) || item.name.en.toLowerCase().includes(inputSearch.toLowerCase()))
            setCoinsList(letsSearch)
            setLoading(false)
        } else {
            getAllCoins().then(data => {
                setCoinsList(data?.data.data)
                setLoading(false)
            })
        }
    }, [debouncedSearchValue])
    useEffect(() => {
        let temp = [...coinsList]
        setLoading(true)
        if (letsSort === "name") {
            temp.sort((a, b) => {
                if (a.name.fa.toLocaleLowerCase() < b.name.fa.toLocaleLowerCase())
                    return -1;
                if (a.name.fa.toLocaleLowerCase() > b.name.fa.toLocaleLowerCase())
                    return 1;
                return 0;
            })
            setCoinsList(temp)
            setLoading(false)
        } else if (letsSort === "price") {
            temp.sort((a, b) => {
                if (a.buy > b.buy)
                    return -1;
                if (a.buy < b.buy)
                    return 1;
                return 0;
            })
            setCoinsList(temp)
            setLoading(false)
        }
    }, [letsSort])
    useEffect(() => {
        setLoading(true)
        getAllCoins().then(data => {
            setCoinsList(data?.data.data)
            setLoading(false)
        })
    }, [])

    if (loading) return <Loading />
    return (
        <div className="w-[400px] m-auto p-2">

            <div className="pb-5 flex items-center justify-between gap-2">
                <div className="relative w-full">
                    <span className="absolute bottom-0 w-6 h-6
                     my-auto text-gray-400 right-2 top-2">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.9362 14.0878L8.73622 9.8878C8.40289 10.1545 8.01955 10.3656 7.58622 10.5211C7.15289 10.6767 6.69178 10.7545 6.20289 10.7545C4.99178 10.7545 3.96678 10.335 3.12789 9.49613C2.289 8.65724 1.86955 7.63224 1.86955 6.42113C1.86955 5.21002 2.289 4.18502 3.12789 3.34613C3.96678 2.50724 4.99178 2.0878 6.20289 2.0878C7.414 2.0878 8.439 2.50724 9.27789 3.34613C10.1168 4.18502 10.5362 5.21002 10.5362 6.42113C10.5362 6.91002 10.4584 7.37113 10.3029 7.80447C10.1473 8.2378 9.93622 8.62113 9.66955 8.95447L13.8696 13.1545L12.9362 14.0878ZM6.20289 9.42113C7.03622 9.42113 7.74455 9.12947 8.32789 8.54613C8.91122 7.9628 9.20289 7.25447 9.20289 6.42113C9.20289 5.5878 8.91122 4.87947 8.32789 4.29613C7.74455 3.7128 7.03622 3.42113 6.20289 3.42113C5.36955 3.42113 4.66122 3.7128 4.07789 4.29613C3.49455 4.87947 3.20289 5.5878 3.20289 6.42113C3.20289 7.25447 3.49455 7.9628 4.07789 8.54613C4.66122 9.12947 5.36955 9.42113 6.20289 9.42113Z" fill="#8F9398" />
                        </svg>
                    </span>
                    <input
                        autoFocus
                        type="text"
                        placeholder="جستجوی بازار"
                        value={inputSearch}
                        onChange={(e) => setInputSearch(e.target.value)}
                        className="xl:w-[400px] w-full py-2 pr-8 pl-4
                        border border-[#E0E0E0] rounded-md outline-none
                        text-xs bg-transparent focus:border-gray-500"
                    />
                </div>
                <div className="cursor-pointer">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.7529 21.1317C9.25293 21.1317 7.12793 20.2567 5.37793 18.5067C3.62793 16.7567 2.75293 14.6317 2.75293 12.1317C2.75293 9.63171 3.62793 7.50671 5.37793 5.75671C7.12793 4.00671 9.25293 3.13171 11.7529 3.13171C11.9863 3.13171 12.2154 3.14005 12.4404 3.15671C12.6654 3.17338 12.8863 3.19838 13.1029 3.23171C12.4196 3.71505 11.8738 4.34421 11.4654 5.11921C11.0571 5.89421 10.8529 6.73171 10.8529 7.63171C10.8529 9.13171 11.3779 10.4067 12.4279 11.4567C13.4779 12.5067 14.7529 13.0317 16.2529 13.0317C17.1696 13.0317 18.0113 12.8275 18.7779 12.4192C19.5446 12.0109 20.1696 11.465 20.6529 10.7817C20.6863 10.9984 20.7113 11.2192 20.7279 11.4442C20.7446 11.6692 20.7529 11.8984 20.7529 12.1317C20.7529 14.6317 19.8779 16.7567 18.1279 18.5067C16.3779 20.2567 14.2529 21.1317 11.7529 21.1317ZM11.7529 19.1317C13.2196 19.1317 14.5363 18.7275 15.7029 17.9192C16.8696 17.1109 17.7196 16.0567 18.2529 14.7567C17.9196 14.84 17.5863 14.9067 17.2529 14.9567C16.9196 15.0067 16.5863 15.0317 16.2529 15.0317C14.2029 15.0317 12.4571 14.3109 11.0154 12.8692C9.57376 11.4275 8.85293 9.68171 8.85293 7.63171C8.85293 7.29838 8.87793 6.96505 8.92793 6.63171C8.97793 6.29838 9.0446 5.96505 9.12793 5.63171C7.82793 6.16505 6.77376 7.01505 5.96543 8.18171C5.1571 9.34838 4.75293 10.665 4.75293 12.1317C4.75293 14.065 5.43626 15.715 6.80293 17.0817C8.1696 18.4484 9.8196 19.1317 11.7529 19.1317Z" fill="#8F9398" />
                    </svg>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <h4 className="cursor-pointer text-[#8F9398] text-xs flex items-center gap-3"
                    onClick={() => SetLetsSort("name")}
                >
                    نام
                    <span>
                        <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.390625 3.5L5.39062 -1.5L10.3906 3.5H0.390625Z" fill="#E0E0E0" />
                            <path d="M5.39062 13.5L0.390625 8.5H10.3906L5.39062 13.5Z" fill="#E0E0E0" />
                        </svg>
                    </span>
                </h4>
                <h4 className="cursor-pointer text-[#8F9398] text-xs flex items-center gap-3"
                    onClick={() => SetLetsSort("price")}
                >
                    آخرین قیمت
                    <span>
                        <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.390625 3.5L5.39062 -1.5L10.3906 3.5H0.390625Z" fill="#E0E0E0" />
                            <path d="M5.39062 13.5L0.390625 8.5H10.3906L5.39062 13.5Z" fill="#E0E0E0" />
                        </svg>
                    </span>
                </h4>
            </div>

            <div className="mt-3">
                {
                    coinsList?.map(item => (
                        <div key={item.pair_id}
                            onClick={() => navigate(`${item.base_currency_symbol.en}`, { state: item })}
                            className="flex items-center justify-between cursor-pointer
                         border-b border-[#F5F5F5] py-2"
                        >
                            <div className="flex items-center gap-3">
                                <img src={item.logo} width={29} height={28} />
                                <h6 className="text-xs text-[#41474Fs]">
                                    {item.name.fa}
                                    <span className="mr-1">({item.base_currency_symbol.en.toLocaleUpperCase()})</span>
                                </h6>
                            </div>
                            <h6 className="text-sm">
                                {item.buy.toLocaleString()}
                                <span className="text-[#62676E] text-xs ml-1">IRR</span>
                            </h6>
                        </div>
                    ))
                }
            </div>

        </div>
    );
}

export default CoinsListPage;