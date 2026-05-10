"""
SGame2 美术资源批量生成脚本
使用 OpenAI GPT Image 2 (gpt-image-1) 生成游戏资产

运行前：
1. 设置环境变量 OPENAI_API_KEY
2. pip install openai
3. 确保 Clash 代理在 7890 端口

使用：
  python generate_assets.py advisors    # 只生成 12 个士人
  python generate_assets.py backgrounds # 只生成 4 个背景
  python generate_assets.py icons       # 只生成 13 个图标
  python generate_assets.py map         # 只生成 5 个地图节点
  python generate_assets.py test        # 生成 1 张测试图（商鞅）
  python generate_assets.py all         # 全部 34 张
"""
import os
import sys
import base64
from pathlib import Path
from openai import OpenAI

# Clash 代理（你本机 7890）
os.environ["HTTPS_PROXY"] = "http://127.0.0.1:7890"
os.environ["HTTP_PROXY"] = "http://127.0.0.1:7890"

API_KEY = os.getenv("OPENAI_API_KEY")
if not API_KEY:
    print("错误：请先设置环境变量 OPENAI_API_KEY")
    sys.exit(1)

client = OpenAI(api_key=API_KEY)

# 全局风格常量
STYLE_SUFFIX = (
    "原创战国竹简纸卷风格，深褐、暗金、竹青配色为主，"
    "古朴压迫谋略感，无现代元素，无英文字符，无水印"
)

# 输出目录（相对于脚本位置）
ASSETS_ROOT = Path(__file__).parent.parent / "public" / "assets"

# 默认质量（可改为 low / medium / high）
QUALITY = "high"


def generate_image(prompt: str, out_path: Path, size: str = "1024x1024"):
    """调用 gpt-image-1 生成一张图并保存"""
    print(f"  生成中: {out_path.name} ({size}, {QUALITY})")
    out_path.parent.mkdir(parents=True, exist_ok=True)
    full_prompt = f"{prompt}。{STYLE_SUFFIX}"
    try:
        r = client.images.generate(
            model="gpt-image-1",
            prompt=full_prompt,
            size=size,
            quality=QUALITY,
            n=1,
        )
        img_bytes = base64.b64decode(r.data[0].b64_json)
        out_path.write_bytes(img_bytes)
        print(f"  ✓ 已保存: {out_path}")
    except Exception as e:
        print(f"  ✗ 失败: {e}")


# ── 士人（12 个）────────────────────────────────
ADVISORS = [
    ("shang-yang",  "商鞅，法家改革者，威严肃穆，侧身半身肖像，深色锦袍，头戴冠"),
    ("wu-qi",       "吴起，战国兵家名将，侧身半身像，铠甲纹饰，手按兵符，眼神坚毅"),
    ("zhang-yi",    "张仪，纵横家游说者，侧身半身像，长袍广袖，手持竹简，神态机敏"),
    ("mengzi",      "孟子，儒家大儒，侧身半身像，宽袍大袖，须髯飘然，温厚仁和"),
    ("xunzi",       "荀子，儒家学者，侧身半身像，朴素深衣，手捧典籍，端庄严肃"),
    ("fan-ju",      "范雎，秦相纵横家，侧身半身像，深色朝服，神色深沉，眉宇间带权谋气"),
    ("li-si",       "李斯，法家权臣，侧身半身像，冠冕朝服，手持笏板，神情肃穆"),
    ("le-yi",       "乐毅，战国兵家名将，侧身半身像，武将铠甲，披红色战袍，气势沉稳"),
    ("lian-po",     "廉颇，赵国老将，侧身半身像，白发铠甲，眉骨粗犷，手按剑柄"),
    ("bai-qi",      "白起，秦国战神，侧身半身像，黑色铠甲，冷峻肃杀，眼神凛冽"),
    ("zhao-kuo",    "赵括，年轻武将，侧身半身像，明亮铠甲，书生气质与武将打扮混合"),
    ("lin-xiangru", "蔺相如，赵国文臣，侧身半身像，文官朝服，神态从容，手持玉璧"),
]


def gen_advisors():
    print("=== 生成 12 位士人题签头像 ===")
    for id_, desc in ADVISORS:
        prompt = (
            f"战国士人题签风格竖版肖像：{desc}。"
            f"深褐羊皮纸底色，竹简纹理边框，暗金勾边装饰，"
            f"人物占画面中上部，下方留空位（不要写字），单人单像"
        )
        generate_image(
            prompt,
            ASSETS_ROOT / "advisors" / f"{id_}.png",
            size="1024x1536",
        )


# ── 背景（4 个）─────────────────────────────────
BACKGROUNDS = [
    ("start-bg",  "展开的战国古地图全景，深褐羊皮纸底色，墨色山川与城池图标，暗金印章点缀，整体氛围古朴神秘"),
    ("game-bg",   "战国朝堂大殿内景，纸卷帛书铺陈，铜器陈列，光影暗沉，羊皮纸米色主调"),
    ("battle-bg", "战国战报卷轴背景，赭红深色调，烽烟意象若隐若现，竹简与战旗元素点缀"),
    ("ending-bg", "战国史书竹简合卷，墨灰主调，古朴沉重，微弱暗金光线从上方洒落"),
]


def gen_backgrounds():
    print("=== 生成 4 张背景 ===")
    for id_, desc in BACKGROUNDS:
        prompt = f"{desc}，横版构图，无文字，无人物，作为游戏背景使用"
        generate_image(
            prompt,
            ASSETS_ROOT / "backgrounds" / f"{id_}.png",
            size="1536x1024",
        )


# ── 数值图标（10 个）+ 国家图标（3 个）────────────
ICONS = [
    ("treasury",         "泉", "金钱财帛"),
    ("food",             "粮", "谷物粮仓"),
    ("military",         "戈", "兵戈武备"),
    ("popular-support",  "民", "黎民百姓"),
    ("monarch-power",    "王", "君王权柄"),
    ("noble-resistance", "族", "贵族势力"),
    ("scholar-prestige", "士", "士人学者"),
    ("diplomatic-credit","信", "邦交信义"),
    ("terror",           "怖", "威慑恐惧"),
    ("social-vitality",  "活", "社会活力"),
    ("qin",              "秦", "秦国族徽"),
    ("zhao",             "赵", "赵国族徽"),
    ("qi",               "齐", "齐国族徽"),
]


def gen_icons():
    print("=== 生成 13 个图标 ===")
    for id_, char, concept in ICONS:
        prompt = (
            f"战国青铜印章风格的圆形图标，深色底色，暗金线条勾勒。"
            f"主体为篆书'{char}'字（{concept}概念），居中，极简，"
            f"无背景装饰，图标式构图"
        )
        generate_image(
            prompt,
            ASSETS_ROOT / "icons" / f"{id_}.png",
            size="1024x1024",
        )


# ── 地图节点（5 个）─────────────────────────────
MAP_NODES = [
    ("node-battle",    "戈", "战事冲突"),
    ("node-diplomacy", "使", "外交使节"),
    ("node-talent",    "贤", "人才招揽"),
    ("node-crisis",    "危", "危机事件"),
    ("node-campaign",  "战", "大型战役"),
]


def gen_map_nodes():
    print("=== 生成 5 个地图节点图标 ===")
    for id_, char, concept in MAP_NODES:
        prompt = (
            f"战国青铜纹样圆形节点图标，深褐底，暗金勾边，"
            f"主体为篆书'{char}'字（{concept}），古地图节点标记风格"
        )
        generate_image(
            prompt,
            ASSETS_ROOT / "map" / f"{id_}.png",
            size="1024x1024",
        )


def gen_test():
    """只生成一张商鞅，用于风格校准"""
    print("=== 测试：生成商鞅头像 ===")
    id_, desc = ADVISORS[0]
    prompt = (
        f"战国士人题签风格竖版肖像：{desc}。"
        f"深褐羊皮纸底色，竹简纹理边框，暗金勾边装饰，"
        f"人物占画面中上部，下方留空位（不要写字），单人单像"
    )
    generate_image(
        prompt,
        ASSETS_ROOT / "advisors" / f"{id_}.png",
        size="1024x1536",
    )


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "test"
    if mode == "test":
        gen_test()
    elif mode == "advisors":
        gen_advisors()
    elif mode == "backgrounds":
        gen_backgrounds()
    elif mode == "icons":
        gen_icons()
    elif mode == "map":
        gen_map_nodes()
    elif mode == "all":
        gen_advisors()
        gen_backgrounds()
        gen_icons()
        gen_map_nodes()
    else:
        print(f"未知模式: {mode}")
        print("可用: test / advisors / backgrounds / icons / map / all")
        sys.exit(1)
    print("完成！")


if __name__ == "__main__":
    main()
