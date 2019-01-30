/****************************
 * Node Types http://www.w3schools.com/dom/dom_nodetype.asp
 * NodeType Named Constant
 * 1   ELEMENT_NODE
 * 2   ATTRIBUTE_NODE
 * 3   TEXT_NODE
 * 4   CDATA_SECTION_NODE
 * 5   ENTITY_REFERENCE_NODE
 * 6   ENTITY_NODE
 * 7   PROCESSING_INSTRUCTION_NODE
 * 8   COMMENT_NODE
 * 9   DOCUMENT_NODE
 * 10  DOCUMENT_TYPE_NODE
 * 11  DOCUMENT_FRAGMENT_NODE
 * 12  NOTATION_NODE
 ****************************/

var TongWen = (function () {
	"use strict";
	var
		version  = '0.4-modified', // 版本

		flagSimp = 'simplified',   // 簡體
		flagTrad = 'traditional',  // 繁體

		zhEncodesSimp = [
			'gb2312', 'gbk', 'x-gbk', 'gb18030', 'hz-gb-2312', 'iso-2022-cn',
			'utf-7', 'utf-8', 'utf-16le', 'x-user-defined'
		],
		zhEncodesTrad = ['big5', 'big5-hkscs', 'x-euc-tw'],

		zhLangSimp = ['zh-cn', 'zh'],
		zhLangTrad = ['zh-tw', 'zh-hk', 'zh-hant-tw', 'zh-hant-hk'],

		t2s = {},                 // 繁轉簡 對照表
		s2t = {},                 // 簡轉繁 對照表

		maxSTLen = 1,             // 簡轉繁 最長的詞句
		maxTSLen = 1,             // 繁轉簡 最長的詞句

		curZhFlag = '',           // 目前網頁編碼
		debug     = false;

// =============================================================================

	// 新增 簡轉繁 對照表
	function addS2TTable(table) {
		var i;
		for (i in table) {
			if (table.hasOwnProperty(i)) {
				maxSTLen = Math.max(maxSTLen, table[i].length);
				s2t[i] = table[i];
			}
		}
	}

	// 新增 繁轉簡 對照表
	function addT2STable(table) {
		var i;
		for (i in table) {
			if (table.hasOwnProperty(i)) {
				maxTSLen = Math.max(maxTSLen, table[i].length);
				t2s[i] = table[i];
			}
		}
	}

	function getZhFlag(doc) {
		var zhflag = '', lang, charset;

		if (doc && doc.documentElement) {
			lang = doc.documentElement.getAttribute('lang');
			if (lang === null) {
				charset = document.characterSet.toLowerCase();
				if (zhEncodesTrad.indexOf(charset) >= 0) {
					zhflag = flagTrad;
				} else if (zhEncodesSimp.indexOf(charset) >= 0) {
					zhflag = flagSimp;
				}
			} else {
				lang = lang.toLowerCase();
				if (zhLangTrad.indexOf(lang) >= 0) {
					zhflag = flagTrad;
				} else if (zhLangSimp.indexOf(lang) >= 0) {
					zhflag = flagSimp;
				}
			}
		}
		return zhflag;
	}

	// 單字轉換
    function convertCharacter (str, zhflag) {
	  let zmap;
      if (zhflag === flagSimp) {
        // 繁轉簡
        zmap = t2s;
      }
	  else {
        // 簡轉繁
        zmap = s2t;
      }
      str = str.split('');
      for (let i = 0, c = str.length; i < c; i += 1) {
        str[i] = zmap[str[i]] || str[i];
      }
      return str.join('');
    }

	// 繁簡轉換
	function convert(str, zhflag) {
		var
			leng = 4, zmap = null, i, j, c,
			txt, s, bol;

		if (zhflag === flagSimp) {
			// 繁轉簡
			zmap = t2s;
			leng = Math.min(maxTSLen, str.length);
		} else {
			// 簡轉繁
			zmap = s2t;
			leng = Math.min(maxSTLen, str.length);
		}

		// 單字轉換
		str = convertCharacter(str, zhflag);

		// 詞彙轉換
		txt = '';
		s = '';
		bol = true;
		for (i = 0, c = str.length; i < c;) {
			bol = true;
			for (j = leng; j > 1; j -= 1) {
				s = str.substr(i, j);
				// if(d)
				//   console.log(s);

				if (s in zmap) {
					txt += zmap[s];
					i += j;
					bol = false;
					break;
				}
			}

			if (bol) {
				txt += str.substr(i, 1);
				i += 1;
			}
		}
		if (txt !== '') {
			str = txt;
		}
		return str;
	}

	function parseTree(doc, zhflag) {
		var treeWalker = doc.createTreeWalker(doc.body, 1|4, null, false);

		(function walker() {
			var node = null, attr = null, cnt = 0;

			while (treeWalker.nextNode()) {
				node = treeWalker.currentNode;

				// Node Types http://www.w3schools.com/dom/dom_nodetype.asp
				switch (node.nodeType) {
				case 1: // ELEMENT_NODE
					// opera.postError(node.nodeName + ': ' + node.innerHTML);
					switch (node.nodeName.toLowerCase()) {
					case 'frame':
					case 'iframe':
					//if (typeof node.contentDocument != 'undefined') {
					//	transPage(node.contentDocument, zhflag);
						// frame.push(node.contentDocument);
					//} else if ((typeof node.contentWindow != 'undefined') && (typeof node.contentWindow.document != 'undefined')) {
					//	transPage(node.contentWindow.document, zhflag);
						// frame.push(node.contentWindow.document);
					//}
					// transPage(node.contentDocument || node.contentWindow.document, zhflag);
					// frame.push(node.contentDocument || node.contentWindow.document);
						break;
					case 'embed':
					case 'object':
					case 'script':
					case 'noscript':
					case 'style':
					case 'title':
					case 'br':
					case 'hr':
					case 'link':
					case 'meta':
						break;
					case 'img':
						attr = node.getAttribute('title');
						if (attr !== null) {
							node.setAttribute('title', convert(attr, zhflag));
						}
						attr = node.getAttribute('alt');
						if (attr !== null) {
							node.setAttribute('alt', convert(attr, zhflag));
						}
						break;
					case 'input':
						if (
							('text,hidden'.indexOf(node.type.toLowerCase()) < 0)
							&& (node.value.length > 0)
						) {
							node.value = convert(node.value, zhflag);
						}
						break;
					case 'textarea':
						if (node.hasChildNodes()) {
							treeWalker.nextNode();
						}
						break;
					case 'option':
						if (node.text.length > 0) {
							node.text = convert(node.text, zhflag);
						}
						break;
					default:
						attr = node.getAttribute('title');
						if (attr !== null) {
							node.setAttribute('title', convert(attr, zhflag));
						}
						break;
					}
					break;
				case 3: // TEXT_NODE
					if (node.nodeValue.length > 0) {
						// opera.postError(node.nodeValue);
						node.nodeValue = convert(node.nodeValue, zhflag);
					}
					break;
				}

				if (70 < cnt) {
					break;
				}
				cnt += 1;
			}

			setTimeout(function () {
				walker();
			}, 1);
		}());
	}

	function transPage(doc, zhflag) {
		curZhFlag = zhflag;
		try {
			doc.title = convert(doc.title, zhflag);
			parseTree(doc, zhflag);
		} catch (ex) {
		}
	}

	function trans2Trad(doc) {
		transPage(doc || document, flagTrad);
	}

	function trans2Simp(doc) {
		transPage(doc || document, flagSimp);
	}

	function transAuto(doc) {
		var curDoc  = doc || document, zhflag;

		if (curZhFlag === '') {
			curZhFlag = getZhFlag(curDoc);
			if (curZhFlag === '') {
				return;
			}
		}
		zhflag = (curZhFlag === flagTrad) ? flagSimp : flagTrad;
		transPage(curDoc, zhflag);

		localStorage.setItem("zhflag", zhflag);
	}

// =============================================================================

	return {
		version            : version,
		addS2TTable        : addS2TTable,
		addT2STable        : addT2STable,
		convert            : convert,
		transPage          : transPage,
		trans2Trad         : trans2Trad,
		trans2Simp         : trans2Simp,
		transAuto          : transAuto,
		flagSimp		   : flagSimp,
		flagTrad		   : flagTrad,
	};

}());
