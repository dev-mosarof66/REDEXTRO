import { useContext, useEffect, useState } from "react";
import { ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Context from "../store/store";
import Header from "../components/Home/Header";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Loader from "../components/Loader";
import axiosInstance from '../axios/axios'
import Ongoing from "../components/Home/Ongoing";
import Plans from "../components/Home/Plans";
import colors from '../constants/colors'
import PlanModal from "../components/Home/PlanModal";




const Home = () => {
  const { plans, setPlans, user } = useContext(Context || []);
  const [loading, setLoading] = useState(false)
  const [todaysPlan, setTodaysPlan] = useState([])
  const [completedPlan, setCompletedPlan] = useState([])
  const [upcomingPlan, setUpcomingPlan] = useState([])


  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true)
      await axiosInstance.get('/user/plans').then((res) => {
        setPlans(res?.data?.plans)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        setLoading(false)
      })
    }
    fetchPlans()
  }, [user])


  //filter all plans 

  useEffect(() => {
    setLoading(true)
    const todaysPlan = plans?.filter((plan) => plan?.status === 'TODAY')
    const CompletedPlan = plans?.filter((plan) => plan?.status === 'PAST')
    const UpcomingPlan = plans?.filter((plan) => plan?.status === 'FUTURE')
    // console.log(todaysPlan)
    setTodaysPlan(todaysPlan)
    setCompletedPlan(CompletedPlan)
    setUpcomingPlan(UpcomingPlan)
    setLoading(false)


  }, [plans, user])

  //loader
  if (loading) return <Loader />

  return (
    <SafeAreaView style={{ height:hp(100), paddingHorizontal: wp(4), backgroundColor: colors.five, }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.four} />
      <Header setLoading={setLoading} user={user} />
      <ScrollView style={{ flex:1, }} showsVerticalScrollIndicator={false}
      >
        <Ongoing todaysPlans={todaysPlan} setTodaysPlan={setTodaysPlan} completedPlan={completedPlan} setCompletedPlan={setCompletedPlan} />
        <Plans upcomingPlans={upcomingPlan} completedPlan={completedPlan} todaysPlan={todaysPlan} />
        <PlanModal />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
