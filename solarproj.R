library(data.table)
library(arules)
library(readr)
library(jsonlite)
library(magrittr)


appliances = fread("appliances.csv")
appliances1 = fread("Appliances Database - Sheet1.csv")
solar = fread("solar radiation.csv")
solar91 = fread("912850_1991_solar.csv")

names(solar91)
summary(solar91$`METSTAT Glo (Wh/m^2)`)
colnames(solar91)[16] <- "total" #rename because its a pain otherwise
colnames(solar91)[1] <- "date"
summary(solar91$total)
#binning data by month:
library(lubridate)
solar91$month <- floor_date(as.Date(solar91$date, format = "%Y-%m-$d"), "month")
head(solar)
library(dplyr)
summarise(solar91, x = mean(month))

solar91Jan <- solar91[(as.numeric(format(as.Date(solar91$date, format = "%Y-%m-%d"), '%m')) == 01) & (solar91$total > 1)]
solar91Feb <- solar91[as.numeric(format(as.Date(solar91$date, format = "%Y-%m-%d"), '%m')) == 02 & (solar91$total > 1)]
solar91Mar <- solar91[as.numeric(format(as.Date(solar91$date, format = "%Y-%m-%d"), '%m')) == 03 & (solar91$total > 1)]
solar91Apr <- solar91[as.numeric(format(as.Date(solar91$date, format = "%Y-%m-%d"), '%m')) == 04 & (solar91$total > 1)]
solar91May <- solar91[as.numeric(format(as.Date(solar91$date, format = "%Y-%m-%d"), '%m')) == 05 & (solar91$total > 1)]
solar91Jun <- solar91[as.numeric(format(as.Date(solar91$date, format = "%Y-%m-%d"), '%m')) == 06 & (solar91$total > 1)]
solar91Jul <- solar91[as.numeric(format(as.Date(solar91$date, format = "%Y-%m-%d"), '%m')) == 07 & (solar91$total > 1)]
solar91Aug <- solar91[as.numeric(format(as.Date(solar91$date, format = "%Y-%m-%d"), '%m')) == 08 & (solar91$total > 1)]
solar91Sep <- solar91[as.numeric(format(as.Date(solar91$date, format = "%Y-%m-%d"), '%m')) == 09 & (solar91$total > 1)]
solar91Oct <- solar91[as.numeric(format(as.Date(solar91$date, format = "%Y-%m-%d"), '%m')) == 10 & (solar91$total > 1)]
solar91Nov <- solar91[as.numeric(format(as.Date(solar91$date, format = "%Y-%m-%d"), '%m')) == 11 & (solar91$total > 1)]
solar91Dec <- solar91[as.numeric(format(as.Date(solar91$date, format = "%Y-%m-%d"), '%m')) == 12 & (solar91$total > 1)]
summary(solar91Jan$total)
means = c(
mean(solar91Jan$total),
mean(solar91Feb$total),
mean(solar91Mar$total),
mean(solar91Apr$total),
mean(solar91May$total),
mean(solar91Jun$total),
mean(solar91Jul$total),
mean(solar91Aug$total),
mean(solar91Sep$total),
mean(solar91Oct$total),
mean(solar91Nov$total),
mean(solar91Dec$total)
)
late_means = c(
  mean(solar91Sep$total),
  mean(solar91Oct$total),
  mean(solar91Nov$total),
  mean(solar91Dec$total)
)

mean(means)
normalizedMeans <- means / mean(means)
normalizedMeans

late_normalized_means <- late_means / mean(late_means)
late_normalized_means

sol12_low_9 <- sol12_low[as.numeric(format(as.Date(sol12_low$date, format = "%Y-%m-%d"),'%m')) == 09]

names(solar)
mean(as.numeric(solar$power))
max(solar$power)
mean(as.numeric(solar$power))
solar_day <- solar[(strptime(solar$time, "%H:%M:%S") > strptime("08:00:00", "%H:%M:%S")) & (strptime(solar$time, "%H:%M:%S") < strptime("10:00:00", "%H:%M:%S"))]
mean(as.numeric(solar_day$power))
#each month of the solar radiation
solar9 <- solar[as.numeric(format(as.Date(solar$date, format = "%Y-%m-%d"),'%m')) == 09]
solar10 <- solar[as.numeric(format(as.Date(solar$date, format = "%Y-%m-%d"),'%m')) == 10]
solar11 <- solar[as.numeric(format(as.Date(solar$date, format = "%Y-%m-%d"),'%m')) == 11]
solar12 <- solar[as.numeric(format(as.Date(solar$date, format = "%Y-%m-%d"),'%m')) == 12]
summary(as.numeric(solar9$power))
summary(as.numeric(solar10$power))
summary(as.numeric(solar11$power))
summary(as.numeric(solar12$power))
sd(as.numeric(solar9$power))
sd(as.numeric(solar10$power))
sd(as.numeric(solar11$power))
sd(as.numeric(solar12$power))
solar9_high <- solar9[as.numeric(solar9$power) > 1000]
summary(as.numeric(solar9_high$power))

#get the ratio of the solar power of each piece of data to the late means. Then extrapolate that data to extend over the whole year, giving a monthly average of solar radiation
solarMeans <- c(
  mean(as.numeric(solar9$power)),
  mean(as.numeric(solar10$power)),
  mean(as.numeric(solar11$power)),
  mean(as.numeric(solar12$power))
  )
normSolarMeans <- solarMeans / mean(solarMeans)
solarEnergyLow <- solarMeans * 72 * 24 * .08
solarEnergyMid <- solarMeans * 72 * 24 * .1
solarEnergyHigh <- solarMeans * 72 * 24 * .12
solarEnergyLow
solarEnergyHigh
solarEnergyMeans <- means * 24 * 72 * .1
mean(solarEnergyMeans[9:12] / solarEnergyMid)
solarEnergyList <- solarEnergyMeans / mean(solarEnergyMeans[9:12] / solarEnergyMid)


ratios = solarMeans / late_means
ratios
sec_ratios = normalizedMeans[9:12] / late_normalized_means

sec_ratios

#Each hour of the solar radiation
solhour0 = solar[(strptime(solar$time, "%H:%M:%S") > strptime("00:00:00", "%H:%M:%S")) & (strptime(solar$time, "%H:%M:%S") < strptime("01:00:00", "%H:%M:%S"))]
solhour1 = solar[(strptime(solar$time, "%H:%M:%S") > strptime("01:00:00", "%H:%M:%S")) & (strptime(solar$time, "%H:%M:%S") < strptime("02:00:00", "%H:%M:%S"))]
solhour2 = solar[(strptime(solar$time, "%H:%M:%S") > strptime("02:00:00", "%H:%M:%S")) & (strptime(solar$time, "%H:%M:%S") < strptime("03:00:00", "%H:%M:%S"))]
solhour3 = solar[(strptime(solar$time, "%H:%M:%S") > strptime("03:00:00", "%H:%M:%S")) & (strptime(solar$time, "%H:%M:%S") < strptime("04:00:00", "%H:%M:%S"))]
solhour4 = solar[(strptime(solar$time, "%H:%M:%S") > strptime("04:00:00", "%H:%M:%S")) & (strptime(solar$time, "%H:%M:%S") < strptime("05:00:00", "%H:%M:%S"))]
solhour5 = solar[(strptime(solar$time, "%H:%M:%S") > strptime("05:00:00", "%H:%M:%S")) & (strptime(solar$time, "%H:%M:%S") < strptime("06:00:00", "%H:%M:%S"))]
solhour6 = solar[(strptime(solar$time, "%H:%M:%S") > strptime("06:00:00", "%H:%M:%S")) & (strptime(solar$time, "%H:%M:%S") < strptime("07:00:00", "%H:%M:%S"))]
solhour7 = solar[(strptime(solar$time, "%H:%M:%S") > strptime("07:00:00", "%H:%M:%S")) & (strptime(solar$time, "%H:%M:%S") < strptime("08:00:00", "%H:%M:%S"))]
solhour8 = solar[(strptime(solar$time, "%H:%M:%S") > strptime("08:00:00", "%H:%M:%S")) & (strptime(solar$time, "%H:%M:%S") < strptime("09:00:00", "%H:%M:%S"))]
solhour9 = solar[(strptime(solar$time, "%H:%M:%S") > strptime("09:00:00", "%H:%M:%S")) & (strptime(solar$time, "%H:%M:%S") < strptime("10:00:00", "%H:%M:%S"))]
solhour10 = solar[(strptime(solar$time, "%H:%M:%S") > strptime("10:00:00", "%H:%M:%S")) & (strptime(solar$time, "%H:%M:%S") < strptime("11:00:00", "%H:%M:%S"))]
solhour11 = solar[(strptime(solar$time, "%H:%M:%S") > strptime("11:00:00", "%H:%M:%S")) & (strptime(solar$time, "%H:%M:%S") < strptime("12:00:00", "%H:%M:%S"))]
solhour12 = solar[(strptime(solar$time, "%H:%M:%S") > strptime("12:00:00", "%H:%M:%S")) & (strptime(solar$time, "%H:%M:%S") < strptime("13:00:00", "%H:%M:%S"))]
solhour13 = solar[(strptime(solar$time, "%H:%M:%S") > strptime("13:00:00", "%H:%M:%S")) & (strptime(solar$time, "%H:%M:%S") < strptime("14:00:00", "%H:%M:%S"))]
solhour14 = solar[(strptime(solar$time, "%H:%M:%S") > strptime("14:00:00", "%H:%M:%S")) & (strptime(solar$time, "%H:%M:%S") < strptime("15:00:00", "%H:%M:%S"))]
solhour15 = solar[(strptime(solar$time, "%H:%M:%S") > strptime("15:00:00", "%H:%M:%S")) & (strptime(solar$time, "%H:%M:%S") < strptime("16:00:00", "%H:%M:%S"))]
solhour16 = solar[(strptime(solar$time, "%H:%M:%S") > strptime("16:00:00", "%H:%M:%S")) & (strptime(solar$time, "%H:%M:%S") < strptime("17:00:00", "%H:%M:%S"))]
solhour17 = solar[(strptime(solar$time, "%H:%M:%S") > strptime("17:00:00", "%H:%M:%S")) & (strptime(solar$time, "%H:%M:%S") < strptime("18:00:00", "%H:%M:%S"))]
solhour18 = solar[(strptime(solar$time, "%H:%M:%S") > strptime("18:00:00", "%H:%M:%S")) & (strptime(solar$time, "%H:%M:%S") < strptime("19:00:00", "%H:%M:%S"))]
solhour19 = solar[(strptime(solar$time, "%H:%M:%S") > strptime("19:00:00", "%H:%M:%S")) & (strptime(solar$time, "%H:%M:%S") < strptime("20:00:00", "%H:%M:%S"))]
solhour20 = solar[(strptime(solar$time, "%H:%M:%S") > strptime("20:00:00", "%H:%M:%S")) & (strptime(solar$time, "%H:%M:%S") < strptime("21:00:00", "%H:%M:%S"))]
solhour21 = solar[(strptime(solar$time, "%H:%M:%S") > strptime("21:00:00", "%H:%M:%S")) & (strptime(solar$time, "%H:%M:%S") < strptime("22:00:00", "%H:%M:%S"))]
solhour22 = solar[(strptime(solar$time, "%H:%M:%S") > strptime("22:00:00", "%H:%M:%S")) & (strptime(solar$time, "%H:%M:%S") < strptime("23:00:00", "%H:%M:%S"))]
solhour23 = solar[(strptime(solar$time, "%H:%M:%S") > strptime("23:00:00", "%H:%M:%S")) & (strptime(solar$time, "%H:%M:%S") < strptime("24:00:00", "%H:%M:%S"))]
#finding means within the solar radiation
mean(as.numeric(solhour0$power)) #1.316
mean(as.numeric(solhour1$power)) #1.380
mean(as.numeric(solhour2$power)) #1.384
mean(as.numeric(solhour3$power)) #1.364
mean(as.numeric(solhour4$power)) #1.363
mean(as.numeric(solhour5$power)) #1.354
mean(as.numeric(solhour6$power)) #9.852
mean(as.numeric(solhour7$power)) #129.889
mean(as.numeric(solhour8$power)) #371.947
mean(as.numeric(solhour9$power)) #552.512
mean(as.numeric(solhour10$power)) #684.560
mean(as.numeric(solhour11$power)) #714.475
hist(as.numeric(solhour12$power)) #727.868
mean(as.numeric(solhour13$power)) #649.837
mean(as.numeric(solhour14$power)) #514.964
mean(as.numeric(solhour15$power)) #317.187
mean(as.numeric(solhour16$power)) #208.950
mean(as.numeric(solhour17$power)) #55.025
mean(as.numeric(solhour18$power)) #2.956
mean(as.numeric(solhour19$power)) #1.347
mean(as.numeric(solhour20$power)) #1.347
mean(as.numeric(solhour21$power)) #1.347
mean(as.numeric(solhour22$power)) #1.347
mean(as.numeric(solhour23$power)) #1.347
#the parameters to find the actual amount of power supplied
area <- 72 #m^2
watts <- sum(1.316,1.38,1.384,1.363,1.354,9.852,129.889,371.947,552.512,684.56,714.475,727.868,649.837,514.964,317.187,208.95,55.025,2.956,1.347,1.347,1.347,1.347,1.347)
efficiency <- .1 #differs based on time
pow <- area * watts * efficiency
pow

sol12_low <- solhour12[as.numeric(solhour12$power) < 800]
hist(as.numeric(sol12_low$power))
table(sol12_low$date)
sol12_low_9 <- sol12_low[as.numeric(format(as.Date(sol12_low$date, format = "%Y-%m-%d"),'%m')) == 09]
sol12_low_10 <- sol12_low[as.numeric(format(as.Date(sol12_low$date, format = "%Y-%m-%d"),'%m')) == 10]
sol12_low_11 <- sol12_low[as.numeric(format(as.Date(sol12_low$date, format = "%Y-%m-%d"),'%m')) == 11]
sol12_low_12 <- sol12_low[as.numeric(format(as.Date(sol12_low$date, format = "%Y-%m-%d"),'%m')) == 12]

c(
nrow(sol12_low_9),
nrow(sol12_low_10),
nrow(sol12_low_11),
nrow(sol12_low_12)
)



solar_split <- solar[cut(as.numeric(format(as.Date(solar$date, format="%Y-%m-%d")), '%Y'), 120, include.lowest = TRUE)]

write_json <- function(df, path, df_type = "rows", raw_type = "mongo"){
  require(readr)
  require(jsonlite)
  df %>% 
    toJSON(dataframe = df_type, raw = raw_type) %>%
    write_lines(path)
  df
}
write_json(appliances1, "C:/Users/1/Documents/swen220/appliances.json")
appliances1$enabled
