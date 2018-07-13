-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 23, 2018 at 09:19 AM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mindsell`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `adminId` int(9) NOT NULL,
  `usernmae` varchar(50) NOT NULL,
  `passowrd` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`adminId`, `usernmae`, `passowrd`) VALUES
(1, 'admin1', 'admin1234');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `categoryId` int(9) NOT NULL,
  `categoryName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`categoryId`, `categoryName`) VALUES
(1, 'Act'),
(2, 'Astronomy'),
(3, 'Board Game'),
(4, 'Calligraphy'),
(5, 'Computing'),
(6, 'Cooking'),
(7, 'Craft'),
(8, 'Design'),
(9, 'Drawing'),
(10, 'Dressing'),
(11, 'Hiking'),
(12, 'Cosmetology'),
(13, 'Mobile Game'),
(14, 'Photography'),
(15, 'Photoshop'),
(16, 'Playing'),
(17, 'Reading'),
(18, 'Shopping'),
(19, 'Weather'),
(20, 'Other'),
(21, 'Theme');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `commentId` int(9) NOT NULL,
  `userId` int(9) NOT NULL,
  `nickname` varchar(50) NOT NULL,
  `photo` varchar(200) DEFAULT NULL,
  `courseId` int(9) NOT NULL,
  `content` varchar(200) CHARACTER SET utf8mb4 NOT NULL,
  `createDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`commentId`, `userId`, `nickname`, `photo`, `courseId`, `content`, `createDate`) VALUES
(1, 15, 'Nickhun', 'user9.jpg\r\n', 10, 'That was so cool！！！！', '2017-12-04'),
(2, 16, 'Lai Kai Wan', 'user10.jpg\r\n', 10, 'I love that!', '2017-12-05'),
(3, 16, 'Lai Kai Wan', 'user10.jpg\r\n', 1, 'COOL WOW.', '2017-12-05'),
(4, 16, 'Lai Kai Wan', 'user10.jpg\r\n', 10, 'Lets do it XDDD', '2017-12-05'),
(5, 6, 'John', 'user1.jpg\r\n', 10, '正呀！', '2017-12-05'),
(6, 6, 'John', 'user1.jpg\r\n', 1, '超想學！！！', '2017-12-05'),
(7, 16, 'Lai Kai Wan', 'user10.jpg\r\n', 10, 'love it too!!!', '2017-12-05'),
(8, 16, 'Lai Kai Wan', 'user10.jpg\r\n', 1, 'That\'s great~', '2017-12-05');

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `courseId` int(9) NOT NULL,
  `userId` int(9) NOT NULL,
  `title` varchar(500) CHARACTER SET utf8mb4 NOT NULL,
  `description` varchar(1000) CHARACTER SET utf8mb4 NOT NULL,
  `categoryId` int(9) NOT NULL,
  `rating` decimal(2,1) NOT NULL DEFAULT '5.0',
  `popularity` int(9) NOT NULL DEFAULT '0',
  `youtubeLink` varchar(200) DEFAULT NULL,
  `price` int(9) NOT NULL DEFAULT '0',
  `createDate` date NOT NULL,
  `image` varchar(300) DEFAULT NULL,
  `location` varchar(300) DEFAULT NULL,
  `livestreamPath` varchar(200) DEFAULT NULL,
  `hashtag` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`courseId`, `userId`, `title`, `description`, `categoryId`, `rating`, `popularity`, `youtubeLink`, `price`, `createDate`, `image`, `location`, `livestreamPath`, `hashtag`) VALUES
(1, 15, '楷書書法分享', '楷書書法分享', 4, '5.0', 15, '', 0, '2017-11-06', 'course1.jpg\r\n', NULL, NULL, NULL),
(2, 16, '鳯凰山導賞團', '鳯凰山導賞團', 11, '4.3', 35, 'https://www.youtube.com/watch?v=OLk4djyxsmo', 0, '2017-11-06', 'course2.jpg\r\n', NULL, 'https://www.youtube.com/watch?v=QGAseF3onp4', NULL),
(3, 9, '師奶教你煮好味豉椒排骨', '師奶教你煮好味豉椒排骨', 6, '2.1', 56, '', 0, '2017-11-05', 'course3.jpg\r\n', NULL, NULL, NULL),
(4, 14, '皮革知識分享及製作', '皮革知識分享及製作', 7, '9.9', 48, '', 100, '2017-11-05', 'course4.jpg\r\n', NULL, NULL, NULL),
(5, 13, 'Canon攝影技巧分享', 'Canon攝影技巧分享', 14, '4.3', 25, '', 0, '2017-11-03', 'course5.jpg\r\n', NULL, NULL, NULL),
(6, 6, '後日獵戶座流星雨觀星技巧', '後日獵戶座流星雨觀星技巧', 2, '5.6', 34, '', 0, '2017-11-06', 'course6.jpg\r\n', NULL, NULL, NULL),
(7, 8, '教授如何繪畫荷花山水畫', '教授如何繪畫荷花山水畫', 9, '4.0', 32, '', 0, '2017-11-05', 'course7.jpg\r\n', NULL, NULL, NULL),
(8, 9, '韓國手卷製作', '韓國手卷製作', 6, '4.2', 32, '', 100, '2017-11-04', 'course8.jpg\r\n', NULL, NULL, NULL),
(10, 16, '挑戰獅子山團', '挑戰獅子山團', 11, '9.2', 52, 'https://www.youtube.com/watch?v=bil_7pzSzSk', 0, '2017-11-23', 'lionmoutain.jpg\r\n', NULL, 'https://www.youtube.com/watch?v=fQ18K3zyPkM', NULL),
(11, 4, '1小時學會製造情侶立體心意咭', '1小時學會製造情侶立體心意咭', 7, '6.7', 57, '', 0, '2017-11-05', 'course11.jpg\r\n', NULL, NULL, NULL),
(12, 12, '親身教你最新韓國眼妝', '親身教你最新韓國眼妝', 12, '6.0', 28, '', 0, '2017-11-02', 'course12.jpg\r\n', NULL, NULL, NULL),
(13, 11, '巴士一日遊加冷知識分享', '巴士一日遊加冷知識分享', 20, '3.4', 23, '', 0, '2017-11-03', 'course13.jpg\r\n', NULL, NULL, NULL),
(14, 14, '情侶皮革咭片套製作', '情侶皮革咭片套製作', 7, '7.0', 211, '', 150, '2017-11-03', 'course14.jpg\r\n', NULL, NULL, NULL),
(15, 11, '教授長者使用智能電話', '教授長者使用智能電話', 5, '8.7', 211, '', 50, '2017-11-02', 'course15.jpg\r\n', NULL, NULL, NULL),
(16, 11, '簡單個人網頁製作', '簡單個人網頁製作', 5, '7.4', 125, '', 0, '2017-11-06', 'course16.jpg\r\n', NULL, NULL, NULL),
(17, 16, '認識城門水塘動植物及一日遊', '認識城門水塘動植物及一日遊', 11, '6.7', 48, 'https://www.youtube.com/watch?v=uwGALewWCjQ', 0, '2017-11-03', 'course17.jpg\r\n', NULL, 'https://www.youtube.com/watch?v=QkKgisXaZ6g', NULL),
(18, 6, 'qweqwe', 'qweqweqwe', 1, '5.0', 0, 'wqeqwe', 123, '2018-04-13', 'sample2.jpg', 'wqe', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `course_image`
--

CREATE TABLE `course_image` (
  `courseImageId` int(9) NOT NULL,
  `path` varchar(300) DEFAULT NULL,
  `courseId` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `course_image`
--

INSERT INTO `course_image` (`courseImageId`, `path`, `courseId`) VALUES
(1, 'lionmoutain.jpg\r\n', 10),
(2, NULL, 15),
(3, NULL, 2);

-- --------------------------------------------------------

--
-- Table structure for table `course_like`
--

CREATE TABLE `course_like` (
  `courseLikeId` int(9) NOT NULL,
  `userId` int(9) NOT NULL,
  `courseId` int(9) NOT NULL,
  `liked` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `course_like`
--

INSERT INTO `course_like` (`courseLikeId`, `userId`, `courseId`, `liked`) VALUES
(3, 16, 15, 1),
(4, 6, 10, 1),
(5, 6, 1, 1),
(6, 16, 10, 1),
(7, 16, 1, 1),
(8, 15, 10, 1);

-- --------------------------------------------------------

--
-- Table structure for table `course_timetable`
--

CREATE TABLE `course_timetable` (
  `courseTimetableId` int(9) NOT NULL,
  `courseId` int(9) NOT NULL,
  `lessionDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `enrollment`
--

CREATE TABLE `enrollment` (
  `enrollmentId` int(9) NOT NULL,
  `userId` int(9) NOT NULL,
  `courseId` int(9) NOT NULL,
  `rating` decimal(2,1) NOT NULL DEFAULT '0.0',
  `enrollmentDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `enrollment`
--

INSERT INTO `enrollment` (`enrollmentId`, `userId`, `courseId`, `rating`, `enrollmentDate`) VALUES
(1, 8, 10, '9.0', '2017-11-15'),
(2, 9, 10, '7.0', '2017-11-16'),
(3, 14, 10, '8.0', '2017-11-16'),
(5, 16, 15, '5.0', '2017-12-05'),
(7, 6, 10, '5.0', '2017-12-05'),
(8, 6, 1, '5.0', '2017-12-05'),
(9, 16, 10, '5.0', '2017-12-05'),
(10, 16, 1, '5.0', '2017-12-05'),
(11, 15, 10, '5.0', '2018-04-04');

-- --------------------------------------------------------

--
-- Table structure for table `livestream`
--

CREATE TABLE `livestream` (
  `livestreamId` int(9) NOT NULL,
  `userId` int(9) NOT NULL,
  `livestreamPath` varchar(200) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `isEnded` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `livestream`
--

INSERT INTO `livestream` (`livestreamId`, `userId`, `livestreamPath`, `title`, `description`, `isEnded`) VALUES
(23, 15, 'https://www.youtube.com/embed/QlDlKiRsscQ', 'This is a title', 'This is a description', 1),
(30, 16, 'twitch/monstercat', 'Music', 'live music enjoy please!', 1),
(31, 16, 'youtube/OxFsqdDpvk4', 'asd', 'asd', 0),
(32, 16, 'youtube/OxFsqdDpvk4', 'asd', 'asd', 0);

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `notificationId` int(9) NOT NULL,
  `createDate` date NOT NULL,
  `isRead` int(1) NOT NULL DEFAULT '0',
  `sender` int(9) NOT NULL,
  `receiver` int(9) NOT NULL,
  `message` varchar(200) CHARACTER SET utf8mb4 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`notificationId`, `createDate`, `isRead`, `sender`, `receiver`, `message`) VALUES
(1, '2017-12-04', 1, 15, 16, 'Nickhun has enrolled your course 挑戰獅子山團.'),
(2, '2017-12-05', 0, 16, 11, 'Lai Kai Wan has enrolled your course 教授長者使用智能電話.'),
(3, '2017-12-05', 1, 16, 16, 'Lai Kai Wan has enrolled your course 挑戰獅子山團.'),
(4, '2017-12-05', 1, 6, 16, 'John has enrolled your course 挑戰獅子山團.'),
(5, '2017-12-05', 1, 6, 15, 'John has enrolled your course 楷書書法分享.'),
(6, '2017-12-05', 1, 16, 16, 'Lai Kai Wan has enrolled your course 挑戰獅子山團.'),
(7, '2017-12-05', 1, 16, 15, 'Lai Kai Wan has enrolled your course 楷書書法分享.'),
(8, '2018-04-04', 1, 15, 16, 'Nickhun has liked your course 挑戰獅子山團.'),
(9, '2018-04-04', 1, 15, 16, 'Nickhun has enrolled your course 挑戰獅子山團.'),
(10, '2018-04-04', 1, 15, 16, 'Nickhun leaves a comment about your course 挑戰獅子山團.'),
(11, '2018-04-23', 0, 16, 6, 'Lai Kai Wan starts a live stream. Check out: http://localhost:3000/livestream?livestream_path=twitch/monstercat'),
(12, '2018-04-23', 1, 16, 16, 'Lai Kai Wan starts a live stream. Check out: http://localhost:3000/livestream?livestream_path=twitch/monstercat'),
(13, '2018-04-23', 1, 16, 15, 'Lai Kai Wan starts a live stream. Check out: http://localhost:3000/livestream?livestream_path=twitch/monstercat'),
(14, '2018-04-23', 0, 16, 6, 'Lai Kai Wan starts a live stream. Check out: http://localhost:3000/livestream?livestream_path=youtube/OxFsqdDpvk4'),
(15, '2018-04-23', 1, 16, 16, 'Lai Kai Wan starts a live stream. Check out: http://localhost:3000/livestream?livestream_path=youtube/OxFsqdDpvk4'),
(16, '2018-04-23', 1, 16, 15, 'Lai Kai Wan starts a live stream. Check out: http://localhost:3000/livestream?livestream_path=youtube/OxFsqdDpvk4'),
(17, '2018-04-23', 0, 16, 6, 'Lai Kai Wan starts a live stream. Check out: http://localhost:3000/livestream?livestream_path=youtube/OxFsqdDpvk4'),
(18, '2018-04-23', 1, 16, 16, 'Lai Kai Wan starts a live stream. Check out: http://localhost:3000/livestream?livestream_path=youtube/OxFsqdDpvk4'),
(19, '2018-04-23', 1, 16, 15, 'Lai Kai Wan starts a live stream. Check out: http://localhost:3000/livestream?livestream_path=youtube/OxFsqdDpvk4');

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
  `ratingId` int(9) NOT NULL,
  `courseId` int(9) NOT NULL,
  `tutorId` int(9) NOT NULL,
  `userId` int(9) NOT NULL,
  `Professional` decimal(2,1) NOT NULL DEFAULT '5.0',
  `Creative` decimal(2,1) NOT NULL DEFAULT '5.0',
  `Useful` decimal(2,1) NOT NULL DEFAULT '5.0',
  `Interesting` decimal(2,1) NOT NULL DEFAULT '5.0',
  `Detailed` decimal(2,1) NOT NULL DEFAULT '5.0',
  `Clear` decimal(2,1) NOT NULL DEFAULT '5.0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `subscription`
--

CREATE TABLE `subscription` (
  `subscriptionId` int(9) NOT NULL,
  `userId` int(9) NOT NULL,
  `tutorId` int(9) NOT NULL,
  `subscriptionDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subscription`
--

INSERT INTO `subscription` (`subscriptionId`, `userId`, `tutorId`, `subscriptionDate`) VALUES
(1, 15, 11, '2017-12-05'),
(2, 15, 9, '2017-12-05'),
(3, 15, 6, '2017-12-05'),
(4, 6, 16, '2017-12-05'),
(5, 6, 15, '2017-12-05'),
(6, 16, 16, '2017-12-05'),
(8, 15, 16, '2018-04-04');

-- --------------------------------------------------------

--
-- Table structure for table `theme`
--

CREATE TABLE `theme` (
  `themeId` int(9) NOT NULL,
  `title` varchar(200) CHARACTER SET utf8 NOT NULL,
  `introduction` varchar(500) CHARACTER SET utf8 NOT NULL,
  `background` varchar(500) CHARACTER SET utf8 NOT NULL,
  `history` varchar(500) CHARACTER SET utf8 NOT NULL,
  `content` varchar(500) CHARACTER SET utf8 NOT NULL,
  `hashtag` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `theme`
--

INSERT INTO `theme` (`themeId`, `title`, `introduction`, `background`, `history`, `content`, `hashtag`) VALUES
(5, 'qwqwe', 'qwe', 'qwe', 'qew', 'qwe', 'qweqw'),
(6, 'asd', 'asd', 'ads', '', 'asd', 'ads'),
(7, 'dsad', 'asfda', 'asd', '', 'ad', 'asd'),
(8, 'bvcb', 'cbvbc', 'cvb', 'vb', 'cvb', 'cvb'),
(9, 'bvcb', 'cbvbc', 'cvb', 'vb', 'cvb', 'cvb'),
(10, '剪紙藝術', '中國剪紙藝術普及各地區和各民族之間，是妝點生活的流行民間藝術。主要由女性推行，長期以來皆由母親傳授給女兒，在農村地區更是普及，技巧嫻熟的藝術家們極獲讚佩。剪紙需運用許多或剪或割、塗色或留白的技術，愈來愈多的現代技術也派上用場。剪紙主題極為廣泛，藝術家因喜好而為，也跟當地民俗文化（例如中國南方以細膩圖案為主流）及使用目的相關，例如：使用於室內裝飾（窗戶、床及天花板）、節慶（婚禮，生日等慶典）或祈福（求雨、避邪等）。今日，剪紙藝術依然是中國百姓用以表達思想和情感的方式之一，深入民間，呈現出人們互動關懷和藝術創造活力，融合了道德、哲學及美學理念。', '', '剪紙是中國最古老的民間藝術之一，有學者認為剪紙的前身可追溯到漢唐婦女使用金銀箔剪成方勝貼在鬢角為飾的風俗。 早期的剪紙多見於喪葬、祭祀等儀式中，大約跟道家的靈媒神務有關，例如杜甫的《彭衙行》中就有「暖湯濯我足，剪紙招我魂」的明確記載。', '剪紙是古老藝術，不單在中國，全世界各地都有源遠流長的歷史。根據The Art of Paper Cutting一書，中國是最早有剪紙的國家，原因很簡單，因為中國正是發明紙張的地方。中國剪紙，傳統使用紅紙，多是刺繡圖案，花鳥走獸，用來裝飾窗戶，尤其是農曆新年、婚宴喜慶的佳日。歐洲也有剪紙，大概在十五世紀出現。十六世紀在德國及瑞士流行，用來裝飾賀卡。工藝師傅不單用剪刀，還有用刀片出花樣。剪紙不一定是大紅色的，例如荷蘭的傳統剪紙，是白色的。墨西哥的剪紙，色彩繽紛，在社區掛成一片旗海，用來慶祝死亡節（Day of the Dead）。 以下兩個單位，一個靠電腦新方法，設計出傳統紙雕藝術；另一個則用傳統剪刀，剪出現代藝術品。新舊對照，你比較喜歡哪一款？在香港，剪紙是藝術也是生意。', '#papercutting'),
(11, '剪紙藝術', '中國剪紙藝術普及各地區和各民族之間，是妝點生活的流行民間藝術。主要由女性推行，長期以來皆由母親傳授給女兒，在農村地區更是普及，技巧嫻熟的藝術家們極獲讚佩。剪紙需運用許多或剪或割、塗色或留白的技術，愈來愈多的現代技術也派上用場。剪紙主題極為廣泛，藝術家因喜好而為，也跟當地民俗文化（例如中國南方以細膩圖案為主流）及使用目的相關，例如：使用於室內裝飾（窗戶、床及天花板）、節慶（婚禮，生日等慶典）或祈福（求雨、避邪等）。今日，剪紙藝術依然是中國百姓用以表達思想和情感的方式之一，深入民間，呈現出人們互動關懷和藝術創造活力，融合了道德、哲學及美學理念。', '', '據考證，從商代始（公元前1600—1100年）就有人用金銀箔、皮革或絲織品進行接空刻花製作裝飾品。西漢時，人們用麻纖維造紙，傳說漢武帝的寵妃李氏去世後，帝思念不已，臥不安度，食不甘味，於是請術士用麻紙剪了李妃的影像為其招魂，這大概是最早的剪紙。公元105年，蔡倫改進和推廣前人的經驗開始大量造紙，這種鏤花形式因找到了更易普及的材料從而誕生了剪紙藝術，距今已有兩千多年的歷史。\r\n\r\n　　唐宋時期，流行「鏤金作勝」的風俗。「勝」，就是用紙或金銀箔、絲帛剪刻而成的花樣，剪成套方幾何形者，稱為「方勝」；剪成花草形者，稱為「華勝」，剪成人形者，就稱之為「人勝」。南朝梁宗懍在《荊楚歲時記》中記載：「正月七日為人日，（《東方朔傳·歲時節》：天地初開，一日雞，二日狗，三日豬， 四日羊，五日牛，六日馬，七日人，八日谷。其日晴所主之物盛，陰則災。 八日之中，尤以人日為重，又稱「人勝節。」）以七種菜為羹；剪綵為人，或鏤金箔為人，以貼屏風，亦戴之於頭鬢；又造華勝以相遺。」\r\n\r\n　　唐代大詩人杜甫以《人日》為題作詩：「此日此時人共得，一談一笑俗相看。尊前柏葉休隨酒，勝裡金花巧耐寒。」另一位唐代著名詩人李商隱也作', '剪紙是古老藝術，不單在中國，全世界各地都有源遠流長的歷史。根據The Art of Paper Cutting一書，中國是最早有剪紙的國家，原因很簡單，因為中國正是發明紙張的地方。中國剪紙，傳統使用紅紙，多是刺繡圖案，花鳥走獸，用來裝飾窗戶，尤其是農曆新年、婚宴喜慶的佳日。歐洲也有剪紙，大概在十五世紀出現。十六世紀在德國及瑞士流行，用來裝飾賀卡。工藝師傅不單用剪刀，還有用刀片出花樣。剪紙不一定是大紅色的，例如荷蘭的傳統剪紙，是白色的。墨西哥的剪紙，色彩繽紛，在社區掛成一片旗海，用來慶祝死亡節（Day of the Dead）。 以下兩個單位，一個靠電腦新方法，設計出傳統紙雕藝術；另一個則用傳統剪刀，剪出現代藝術品。新舊對照，你比較喜歡哪一款？在香港，剪紙是藝術也是生意。', '#papercutting'),
(12, '剪紙藝術', '中國剪紙藝術普及各地區和各民族之間，是妝點生活的流行民間藝術。主要由女性推行，長期以來皆由母親傳授給女兒，在農村地區更是普及，技巧嫻熟的藝術家們極獲讚佩。剪紙需運用許多或剪或割、塗色或留白的技術，愈來愈多的現代技術也派上用場。剪紙主題極為廣泛，藝術家因喜好而為，也跟當地民俗文化（例如中國南方以細膩圖案為主流）及使用目的相關，例如：使用於室內裝飾（窗戶、床及天花板）、節慶（婚禮，生日等慶典）或祈福（求雨、避邪等）。今日，剪紙藝術依然是中國百姓用以表達思想和情感的方式之一，深入民間，呈現出人們互動關懷和藝術創造活力，融合了道德、哲學及美學理念。', 'asd', '據考證，從商代始（公元前1600—1100年）就有人用金銀箔、皮革或絲織品進行接空刻花製作裝飾品。西漢時，人們用麻纖維造紙，傳說漢武帝的寵妃李氏去世後，帝思念不已，臥不安度，食不甘味，於是請術士用麻紙剪了李妃的影像為其招魂，這大概是最早的剪紙。公元105年，蔡倫改進和推廣前人的經驗開始大量造紙，這種鏤花形式因找到了更易普及的材料從而誕生了剪紙藝術，距今已有兩千多年的歷史。\r\n\r\n　　唐宋時期，流行「鏤金作勝」的風俗。「勝」，就是用紙或金銀箔、絲帛剪刻而成的花樣，剪成套方幾何形者，稱為「方勝」；剪成花草形者，稱為「華勝」，剪成人形者，就稱之為「人勝」。南朝梁宗懍在《荊楚歲時記》中記載：「正月七日為人日，（《東方朔傳·歲時節》：天地初開，一日雞，二日狗，三日豬， 四日羊，五日牛，六日馬，七日人，八日谷。其日晴所主之物盛，陰則災。 八日之中，尤以人日為重，又稱「人勝節。」）以七種菜為羹；剪綵為人，或鏤金箔為人，以貼屏風，亦戴之於頭鬢；又造華勝以相遺。」\r\n\r\n　　唐代大詩人杜甫以《人日》為題作詩：「此日此時人共得，一談一笑俗相看。尊前柏葉休隨酒，勝裡金花巧耐寒。」另一位唐代著名詩人李商隱也作', '剪紙是古老藝術，不單在中國，全世界各地都有源遠流長的歷史。根據The Art of Paper Cutting一書，中國是最早有剪紙的國家，原因很簡單，因為中國正是發明紙張的地方。中國剪紙，傳統使用紅紙，多是刺繡圖案，花鳥走獸，用來裝飾窗戶，尤其是農曆新年、婚宴喜慶的佳日。歐洲也有剪紙，大概在十五世紀出現。十六世紀在德國及瑞士流行，用來裝飾賀卡。工藝師傅不單用剪刀，還有用刀片出花樣。剪紙不一定是大紅色的，例如荷蘭的傳統剪紙，是白色的。墨西哥的剪紙，色彩繽紛，在社區掛成一片旗海，用來慶祝死亡節（Day of the Dead）。 以下兩個單位，一個靠電腦新方法，設計出傳統紙雕藝術；另一個則用傳統剪刀，剪出現代藝術品。新舊對照，你比較喜歡哪一款？在香港，剪紙是藝術也是生意。', 'sdada');

-- --------------------------------------------------------

--
-- Table structure for table `theme_image`
--

CREATE TABLE `theme_image` (
  `themeImageId` int(9) NOT NULL,
  `path` varchar(200) NOT NULL,
  `themeId` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `theme_image`
--

INSERT INTO `theme_image` (`themeImageId`, `path`, `themeId`) VALUES
(1, 'sample1.png', 1),
(2, 'sample1.png', 2),
(3, 'sample1.png', 3),
(4, '', 4),
(5, 'slider_boardgame0.jpg', 5),
(6, 'slider_boardgame1.jpg', 6),
(7, '', 7),
(8, 'slider_boardgame1.jpg', 8),
(9, 'slider_boardgame1.jpg', 9),
(10, 'sample3.jpg', 12),
(11, 'sample1.png', 12),
(12, 'sample2.jpg', 12);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userId` int(9) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL,
  `nickname` varchar(50) DEFAULT NULL,
  `email` varchar(200) NOT NULL,
  `photo` varchar(200) DEFAULT NULL,
  `contact` int(20) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `introduction` varchar(200) DEFAULT NULL,
  `youtubeChannel` varchar(200) DEFAULT NULL,
  `facebookPage` varchar(200) DEFAULT NULL,
  `twitterPage` varchar(200) DEFAULT NULL,
  `telegramGroup` varchar(200) DEFAULT NULL,
  `instagramPage` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userId`, `username`, `password`, `nickname`, `email`, `photo`, `contact`, `gender`, `introduction`, `youtubeChannel`, `facebookPage`, `twitterPage`, `telegramGroup`, `instagramPage`) VALUES
(1, 'admin1', 'admin1234', 'admin1', 'admin1@mindsell.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'user1', 'user1234', 'John', 'user1@gmail.com', 'user1.jpg\r\n', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'user2', 'user1234', 'Tommy', 'user2@gmail.com', 'user2.jpg\r\n', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, 'user3', 'user1234', 'ArMing', 'user3@gmail.com', 'user3.jpg\r\n', 62759272, 'female', NULL, NULL, NULL, NULL, NULL, NULL),
(9, 'user4', 'user1234', 'Pong', 'user4@gmail.com', 'user4.jpg\r\n', 98734754, 'female', NULL, NULL, NULL, NULL, NULL, NULL),
(10, 'user5', 'user1234', 'Jason Wong', 'user5@gmail.com', 'user5.jpg\r\n', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(11, 'user6', 'user1234', 'Nick Khun', 'user6@gmail.com', 'user6.jpg\r\n', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(12, 'user7', 'user1234', 'Apple', 'user7@gmail.com', 'user7.jpg\r\n', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(14, 'user8', 'user1234', 'Wong Chun Ming', 'user8@gmail.com', NULL, 94489383, 'male', NULL, NULL, NULL, NULL, NULL, NULL),
(15, 'user9', 'user1234', 'Nickhun', 'user9@gmail.com', 'user9.jpg\r\n', 67435725, 'male', 'My name is user9. I am a retired english teacher. I hope to share my english calligraphy to you. Hope you enjoy my class.', 'https://www.youtube.com/channel/UC2s9JTT78rTkg9iqbdsVnhg', 'https://www.facebook.com/groups/299262920178518', 'https://twitter.com/HighPeaksHiking', 'https://web.telegram.org/#/im?p=@hikinggroup', 'https://www.instagram.com/hkhikingnphotographing/'),
(16, 'user10', 'user1234', 'Lai Kai Wan', 'user@gmail.com', 'user10.jpg\r\n', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(17, 'jasonwong', '12345678', NULL, 'jasonwong@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(18, 'jasonwong123', 'user1234', NULL, 'jasonwong@yahoo.com.hk', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`adminId`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryId`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`commentId`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`courseId`);

--
-- Indexes for table `course_image`
--
ALTER TABLE `course_image`
  ADD PRIMARY KEY (`courseImageId`);

--
-- Indexes for table `course_like`
--
ALTER TABLE `course_like`
  ADD PRIMARY KEY (`courseLikeId`);

--
-- Indexes for table `course_timetable`
--
ALTER TABLE `course_timetable`
  ADD PRIMARY KEY (`courseTimetableId`);

--
-- Indexes for table `enrollment`
--
ALTER TABLE `enrollment`
  ADD PRIMARY KEY (`enrollmentId`);

--
-- Indexes for table `livestream`
--
ALTER TABLE `livestream`
  ADD PRIMARY KEY (`livestreamId`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`notificationId`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`ratingId`);

--
-- Indexes for table `subscription`
--
ALTER TABLE `subscription`
  ADD PRIMARY KEY (`subscriptionId`);

--
-- Indexes for table `theme`
--
ALTER TABLE `theme`
  ADD PRIMARY KEY (`themeId`);

--
-- Indexes for table `theme_image`
--
ALTER TABLE `theme_image`
  ADD PRIMARY KEY (`themeImageId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `adminId` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `categoryId` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `commentId` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `courseId` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `course_image`
--
ALTER TABLE `course_image`
  MODIFY `courseImageId` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `course_like`
--
ALTER TABLE `course_like`
  MODIFY `courseLikeId` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `course_timetable`
--
ALTER TABLE `course_timetable`
  MODIFY `courseTimetableId` int(9) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `enrollment`
--
ALTER TABLE `enrollment`
  MODIFY `enrollmentId` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `livestream`
--
ALTER TABLE `livestream`
  MODIFY `livestreamId` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `notificationId` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `ratingId` int(9) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subscription`
--
ALTER TABLE `subscription`
  MODIFY `subscriptionId` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `theme`
--
ALTER TABLE `theme`
  MODIFY `themeId` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `theme_image`
--
ALTER TABLE `theme_image`
  MODIFY `themeImageId` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
