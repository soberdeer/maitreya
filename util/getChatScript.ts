import crypto from 'crypto';
import NextCors from 'nextjs-cors';
import { NextApiRequest, NextApiResponse } from 'next';

const CHAT_SCRIPT_BASE = `<script id="chatBroEmbedCode">function ChatbroLoader(chats,async){async=!1!==async;var params={embedChatsParameters:chats instanceof Array?chats:[chats],lang:navigator.language||navigator.userLanguage,needLoadCode:'undefined'==typeof Chatbro,embedParamsVersion:localStorage.embedParamsVersion,chatbroScriptVersion:localStorage.chatbroScriptVersion},xhr=new XMLHttpRequest;xhr.withCredentials=!0,xhr.onload=function(){eval(xhr.responseText)},xhr.onerror=function(){console.error('Chatbro loading error')},xhr.open('GET','//www.chatbro.com/embed.js?'+btoa(unescape(encodeURIComponent(JSON.stringify(params)))),async),xhr.send()};`;
const CHAT_SCRIPT_END = '</script>';

export default async function getChatScript({
  req,
  res,
  domain,
  userId,
  userFullName,
  isMaster,
  secretKey,
  avatar,
  color,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
  domain: string;
  userId?: string | null;
  userFullName?: string | null;
  isMaster: boolean;
  secretKey: string;
  avatar?: string | null;
  color?: string | null;
}): Promise<string> {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  const updatedAvatar = avatar ? `https:${avatar}` : null;
  const signature = `${domain}${userId}${userFullName}${updatedAvatar || ''}${color || ''}${
    isMaster ? 'deleteban' : ''
  }${secretKey}`;

  const chatLoader = `ChatbroLoader({
    encodedChatId: '98fcv',
    siteDomain: '${domain}',
    siteUserExternalId: '${userId}',
    siteUserFullName: '${userFullName}',
    ${updatedAvatar ? `siteUserAvatarUrl: '${updatedAvatar}',` : ''}
    ${color ? `siteUserFullNameColor: '${color}',` : ''}
    ${isMaster ? "permissions: ['delete', 'ban']," : ''}
    signature: '${crypto.createHash('md5').update(signature).digest('hex')}',
  });`;

  return `${CHAT_SCRIPT_BASE}${chatLoader}${CHAT_SCRIPT_END}`;
}
